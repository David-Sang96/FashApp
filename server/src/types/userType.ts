import { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId; // <- explicit
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  isMatchPassword(password: string): Promise<boolean>;
  lastLogin: Date;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
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
  message: string;
  user: {
    _id: string;
    email: string;
    name: string;
    role: string;
    lastLogin: Date;
  };
}
