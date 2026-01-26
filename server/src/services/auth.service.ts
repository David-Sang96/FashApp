import crypto from "crypto";
import { Request } from "express";
import moment from "moment";
import sharp from "sharp";
import { deleteOne, uploadOne } from "../config/cloudinary";
import { AuthRepository } from "../repositories/auth.repository";
import { IUser } from "../types/userType";
import { AppError } from "../utils/AppError";
import { sendResetPasswordEmail } from "../utils/sendResetPasswordEmail";
import { sendVerificationEmail } from "../utils/sendVerificationEmail";

export class AuthService {
  static async register(name: string, email: string, password: string) {
    const existingUser = await AuthRepository.findByEmail(email);
    if (existingUser) throw new AppError("User already exists", 409);
    const newUser = await AuthRepository.createUser({ name, email, password });

    // generate and set verification code
    const verificationToken = newUser.setVerificationToken();
    await AuthRepository.save(newUser);

    // send verification email
    const emailId = await sendVerificationEmail(email, verificationToken);
    if (!emailId) {
      throw new AppError("Failed to send verification email");
    }

    return newUser;
  }

  static async login(email: string, password: string) {
    const user = await AuthRepository.findByEmail(email, true);
    if (!user) throw new AppError("Invalid credentials", 401);

    const isMatch = await user.isMatchPassword(password);
    if (!isMatch) throw new AppError("Invalid credentials", 401);

    if (!user.emailVerified) {
      throw new AppError("Email not verified", 403);
    }

    if (!user.active) {
      throw new AppError("Account has been deactivated", 400);
    }

    return user;
  }

  static async uploadOrUpdateImage(req: Request) {
    if (!req.user) throw new AppError("User not authenticated", 401);

    const user = await AuthRepository.findById(req.user._id);
    if (!user) throw new AppError("User not authenticated", 401);

    if (user.provider !== "local") {
      throw new AppError("Avatar update not allowed", 403);
    }

    if (!req.file) throw new AppError("No file uploaded", 400);

    //Process image with Sharp
    let buffer: Buffer;
    try {
      buffer = await sharp(req.file.buffer)
        .resize(400, 400, { fit: "cover" }) // square, no stretching
        .png({ quality: 90 }) // convert to png
        .toBuffer();
    } catch {
      throw new AppError("Invalid image file", 400);
    }

    const uploaded = await uploadOne(buffer, "fashApp/avatar");

    if (user.avatar?.public_id) {
      await deleteOne(user.avatar.public_id);
    }

    user.avatar = {
      image_url: uploaded.image_url,
      public_id: uploaded.public_id,
    };
    await AuthRepository.save(user);

    return user;
  }

  static async verifyEmail(token: string) {
    // hash incoming token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await AuthRepository.findByVerificationToken(hashedToken);

    if (!user || moment().isAfter(moment(user.verificationTokenExpires))) {
      throw new AppError("Token invalid or expired", 400, user?.email);
    }

    if (user.emailVerified) {
      throw new AppError("Email already verified", 400);
    }

    // Mark verified
    user.emailVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    user.lastLogin = new Date();

    return user;
  }

  static async changePassword(
    currentPassword: string,
    newPassword: string,
    currentUser: IUser,
  ) {
    const user = await AuthRepository.findByEmail(currentUser.email, true);
    if (!user) throw new AppError("User not found", 404);
    const isMatch = await user.isMatchPassword(currentPassword);
    if (!isMatch) throw new AppError("Invalid credentials", 401);

    user.password = newPassword;
    user.refreshToken = undefined;

    await AuthRepository.save(user);
  }

  static async deactivate(currentUser: IUser, password: string) {
    const user = await AuthRepository.findByEmail(currentUser.email, true);
    if (!user) throw new AppError("User not found", 404);

    const isMatch = await user.isMatchPassword(password);
    if (!isMatch) throw new AppError("Invalid credentials", 401);

    user.active = false;
    user.refreshToken = undefined;
    await AuthRepository.save(user);
  }

  static async forgetPasswordEmail(email: string) {
    const user = await AuthRepository.findByEmail(email);
    if (!user) throw new AppError("User not found", 404);

    const resetToken = user.setPasswordResetToken();
    await AuthRepository.save(user);

    const emailId = await sendResetPasswordEmail(user.email, resetToken);
    if (!emailId) {
      throw new AppError("Failed to send reset password email");
    }
  }

  static async resetPassword(token: string, newPassword: string) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await AuthRepository.findByPasswordResetToken(hashedToken);
    if (!user) throw new AppError("Token invalid or expired", 400);

    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await AuthRepository.save(user);
  }

  static async verifyResetToken(token: string) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user =
      await AuthRepository.findByPasswordResetTokenStrict(hashedToken);

    if (!user || moment().isAfter(moment(user.passwordResetExpires))) {
      throw new AppError("Token invalid or expired", 400, user?.email);
    }

    return user;
  }

  static async resendEmail(email: string, type: "verify" | "reset") {
    const user = await AuthRepository.findByEmail(email);
    if (!user) return;

    if (type === "verify") {
      if (user.emailVerified) return;

      user.verificationToken = undefined;
      user.verificationTokenExpires = undefined;

      const token = user.setVerificationToken();
      await AuthRepository.save(user);
      const emailId = await sendVerificationEmail(user.email, token);
      if (!emailId) {
        throw new AppError("Failed to send verification email");
      }
    }

    if (type === "reset") {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;

      const token = user.setPasswordResetToken();
      await AuthRepository.save(user);
      const emailId = await sendResetPasswordEmail(user.email, token);
      if (!emailId) {
        throw new AppError("Failed to send reset password email");
      }
    }
  }
}
