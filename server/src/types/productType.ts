import { Document, Types } from "mongoose";

export interface Image {
  url: string;
  public_alt: string;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  instock_count: number;
  category: string;
  sizes: string[];
  colors: string[];
  images: Image[];
  is_newArrival: boolean;
  is_feature: boolean;
  rating_count: number;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
