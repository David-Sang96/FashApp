export interface Image {
  image_url: string;
  public_id: string;
}

export interface Color {
  name: string;
  hex: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  instock_count: number;
  category: string;
  sizes: string[];
  colors: Color[];
  images: Image[];
  is_newArrival: boolean;
  is_feature: boolean;
  rating_count: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductMeta {
  colors: { name: string; hex: string }[];
  sizes: string[];
  categories: string[];
  totalProductOfEachCategory: { name: string; count: number }[];
  minPrice: number;
  maxPrice: number;
  averageRating: number;
  signupTrend: { month: string; users: number }[];
  recentUsers: {
    _id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    active: boolean;
    role: "admin" | "user";
    provider: "google" | "local";
    avatar: { image_url: string; public_alt: string };
    lastActiveAt: string;
    lastLogin: string;
  }[];
}

export interface GetProductsParams {
  category?: string;
  colors?: string[];
  sizes?: string[];
  priceMin?: number;
  priceMax?: number;
  sort?: string;
  page?: number;
  limit?: number;
  search?: string;
  is_newArrival?: boolean;
  is_feature?: boolean;
}

export interface GetProductsResponse {
  success: boolean;
  result: {
    products: Product[];
    currentPage: number;
    totalPages: number;
    nextPage: boolean;
    previousPage: boolean;
    total: number;
  };
}

export interface CreateProductResponse {
  success: boolean;
  message: string;
  product: Product;
}
