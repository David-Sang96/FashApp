import { Document, Types } from "mongoose";
import { User } from "../models/user.model";
import { IUser } from "../types/userType";

export class AuthRepository {
  // Find a user by email, optionally include password
  static async findByEmail(email: string, includePassword = false) {
    if (includePassword) {
      return User.findOne({ email }).select("+password -__v").exec();
    }
    return User.findOne({ email }).exec();
  }

  // Find user by ID
  static async findById(
    id: string | Types.ObjectId,
  ): Promise<(IUser & Document) | null> {
    return User.findById(id).select("-__v").exec();
  }

  // Create a new user
  static async createUser(data: {
    name: string;
    email: string;
    password: string;
  }) {
    const user = new User(data);
    return user.save();
  }

  // Save an existing user instance
  static async save(user: IUser & Document) {
    return user.save({ validateBeforeSave: false });
  }

  // Find user by verification token
  static async findByVerificationToken(token: string) {
    return User.findOne({
      verificationToken: token,
    })
      .select("+verificationToken +verificationTokenExpires -__v")
      .exec();
  }

  // Find user by password reset token (and check expiration)
  static async findByPasswordResetToken(token: string) {
    return User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    })
      .select("-__v")
      .exec();
  }

  // Find user by password reset token
  static async findByPasswordResetTokenStrict(token: string) {
    return User.findOne({ passwordResetToken: token })
      .select("+passwordResetToken +passwordResetExpires -__v")
      .exec();
  }
}
