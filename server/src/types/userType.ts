import { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId; // <- explicit
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  active: Boolean;
  provider: "local" | "google";
  refreshToken?: string | undefined;
  emailVerified: Boolean;
  verificationToken: string | undefined;
  verificationTokenExpires: Date | undefined;
  passwordResetToken: string | undefined;
  passwordResetExpires: Date | undefined;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;

  isMatchPassword(password: string): Promise<Boolean>;
  isValidVerificationToken(code: string): Boolean;
  setVerificationToken(): string;
  setPasswordResetToken(): string;
}

export interface RegisterResponse {
  success: Boolean;
  message?: string;
  user: {
    _id: string;
    email: string;
    name: string;
    role: string;
    provider: string;
    emailVerified: Boolean;
    createdAt: Date;
  };
}

export interface LoginResponse {
  success: Boolean;
  message?: string;
  user: {
    _id: string;
    email: string;
    name: string;
    role: string;
    provider: string;
    emailVerified: Boolean;
    lastLogin: Date;
  };
}
