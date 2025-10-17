import { Document, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
  isMatchPassword(password: string): Promise<boolean>;
  lastLogin: Date;
  refreshToken: string;
}
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  instock_count: number;
  category: string;
  sizes: string[];
  colors: string[];
  images: { url: string; public_alt: string }[];
  is_newArrival: boolean;
  is_feature: boolean;
  rating_count: number;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
