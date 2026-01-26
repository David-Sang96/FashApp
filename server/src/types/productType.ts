import { Document, Types } from "mongoose";

export interface Image {
  image_url: string;
  public_id: string;
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
