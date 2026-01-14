import { User } from "../models/user.model";
import { IUser } from "../types/userType";
import { AppError } from "../utils/AppError";
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

    if (!user.active) {
      throw new AppError("Account has been deactivated", 400);
    }

    if (!user.emailVerified) {
      throw new AppError("Email not verified", 403);
    }

    return user;
  }

  static async changePassword(
    currentPassword: string,
    newPassword: string,
    currentUser: IUser
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
}
