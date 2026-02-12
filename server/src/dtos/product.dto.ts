import { Color, Image } from "../types/productType";

//These are compile-time types for service layer input.
export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  instock_count: number;
  category: string;
  sizes: string[];
  colors: Color[];
  images?: Image[];
  is_newArrival: boolean;
  is_feature: boolean;
  rating_count: number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {}

//Ah — good question! Let me clarify why DTOs are usually only created for create and update operations in a CRUD setup, and why read/delete usually doesn’t need a DTO.

export interface ProductQueryOptions {
  search?: string;
  category?: string[];
  colors?: string[];
  sizes?: string[];
  priceMin?: number;
  priceMax?: number;
  is_newArrival?: boolean;
  is_feature?: boolean;
  sort?: string;
  page?: number;
  limit?: number;
}
