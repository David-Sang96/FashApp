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
  verificationToken: String | undefined;
  verificationTokenExpires: Date | undefined;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;

  isMatchPassword(password: string): Promise<boolean>;
  isValidVerificationToken(code: string): boolean;
  setVerificationToken(): string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  user: {
    _id: string;
    email: string;
    name: string;
    role: string;
    createdAt: Date;
  };
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  user: {
    _id: string;
    email: string;
    name: string;
    role: string;
    lastLogin: Date;
  };
}
