import crypto from "crypto";
import moment from "moment";
import { User } from "../models/user.model";
import { IUser } from "../types/userType";
import { AppError } from "../utils/AppError";
import { sendResetPasswordEmail } from "../utils/sendResetPasswordEmail";
import { sendVerificationEmail } from "../utils/sendVerificationEmail";

export class AuthService {
  static async register(name: string, email: string, password: string) {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new AppError("User already exists", 409);
    const newUser = await User.create({ name, email, password });

    // generate and set verification code
    const verificationToken = newUser.setVerificationToken();
    await newUser.save({ validateBeforeSave: false });

    // send verification email
    const emailId = await sendVerificationEmail(email, verificationToken);
    if (!emailId) {
      throw new AppError("Failed to send verification email");
    }

    return newUser;
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ email }).select("+password");
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

  static async verifyEmail(token: string) {
    // hash incoming token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      verificationToken: hashedToken,
    }).select("+verificationToken +verificationTokenExpires");

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
    const user = await User.findOne({
      email: currentUser.email,
      _id: currentUser._id,
    }).select("+password");
    if (!user) throw new AppError("User not found", 404);
    const isMatch = await user.isMatchPassword(currentPassword);
    if (!isMatch) throw new AppError("Invalid credentials", 401);

    user.password = newPassword;
    user.refreshToken = undefined;

    await user.save({ validateBeforeSave: false });
  }

  static async deactivate(currentUser: IUser, password: string) {
    const user = await User.findOne({
      email: currentUser?.email,
      _id: currentUser?._id,
    }).select("+password");
    if (!user) throw new AppError("User not found", 404);

    const isMatch = await user.isMatchPassword(password);
    if (!isMatch) throw new AppError("Invalid credentials", 401);

    user.active = false;
    user.refreshToken = undefined;
    await user.save({ validateBeforeSave: false });
  }

  static async forgetPasswordEmail(email: string) {
    const user = await User.findOne({ email });
    if (!user) throw new AppError("User not found", 404);

    const resetToken = user.setPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const emailId = await sendResetPasswordEmail(user.email, resetToken);
    if (!emailId) {
      throw new AppError("Failed to send reset password email");
    }
  }

  static async resetPassword(token: string, newPassword: string) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) throw new AppError("Token invalid or expired", 400);

    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });
  }

  static async verifyResetToken(token: string) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
    }).select("+passwordResetToken +passwordResetExpires");

    if (!user || moment().isAfter(moment(user.passwordResetExpires))) {
      throw new AppError("Token invalid or expired", 400, user?.email);
    }

    return user;
  }

  static async resendEmail(email: string, type: "verify" | "reset") {
    const user = await User.findOne({ email });
    if (!user) return;

    if (type === "verify") {
      if (user.emailVerified) return;

      user.verificationToken = undefined;
      user.verificationTokenExpires = undefined;

      const token = user.setVerificationToken();
      await user.save({ validateBeforeSave: false });
      const emailId = await sendVerificationEmail(user.email, token);
      if (!emailId) {
        throw new AppError("Failed to send verification email");
      }
    }

    if (type === "reset") {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;

      const token = user.setPasswordResetToken();
      await user.save({ validateBeforeSave: false });
      const emailId = await sendResetPasswordEmail(user.email, token);
      if (!emailId) {
        throw new AppError("Failed to send reset password email");
      }
    }
  }
}
