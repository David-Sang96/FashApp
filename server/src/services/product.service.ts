import { Types } from "mongoose";
import { CreateProductDTO, ProductQueryOptions } from "../dtos/product.dto";
import { Product } from "../models/product.model";
import { ProductRepository } from "../repositories/product.repository";
import { AppError } from "../utils/AppError";

export class ProductService {
  constructor(private repo = new ProductRepository()) {}

  async createProduct(data: CreateProductDTO, userId: Types.ObjectId) {
    const product = await this.repo.create({ ...data, userId });
    if (!product) throw new AppError("Product creation failed");
    return product;
  }

  async updateProduct(id: string, data: any) {
    const updated = await this.repo.updateById(id, data);
    if (!updated) {
      throw new AppError("Product not found", 404);
    }
    return updated;
  }

  async deleteProduct(id: string) {
    const deleted = await this.repo.deleteById(id);
    if (!deleted) {
      throw new AppError("Product not found", 404);
    }
    return deleted;
  }

  async getProducts(options: ProductQueryOptions) {
    // prettier-ignore
    const {search, category, colors,sizes,priceMin,priceMax,is_newArrival,is_feature,sort,page = 1,limit = 12} = options;

    const filter: any = {};

    if (search) filter.name = { $regex: search, $options: "i" }; // text search
    if (category) filter.category = category;
    if (colors?.length)
      filter.colors = { $in: colors.map((c) => new RegExp(`^${c}$`, "i")) }; //case-insensitive matching
    if (sizes?.length)
      filter.sizes = { $in: sizes.map((c) => new RegExp(`^${c}$`, "i")) };
    if (priceMin !== undefined || priceMax !== undefined) {
      filter.price = {};
      if (priceMin !== undefined) filter.price.$gte = priceMin;
      if (priceMax !== undefined) filter.price.$lte = priceMax;
    }
    if (is_newArrival !== undefined) filter.is_newArrival = is_newArrival;
    if (is_feature !== undefined) filter.is_feature = is_feature;

    // Sorting
    let sortOption: any = {};
    if (sort === "price_asc") sortOption.price = 1;
    else if (sort === "price_desc") sortOption.price = -1;
    else if (sort === "rating_asc") sortOption.rating_count = 1;
    else if (sort === "rating_desc") sortOption.rating_count = -1;
    else if (sort === "latest") sortOption.createdAt = -1;
    else sortOption.createdAt = -1;

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(filter).sort(sortOption).skip(skip).limit(limit).lean(),
      Product.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);
    const previousPage = page > 1 ? page - 1 : null;
    const nextPage = page < totalPages ? page + 1 : null;
    const count = products.length;

    return {
      products,
      total,
      count,
      previousPage,
      nextPage,
      currentPage: page,
      totalPages,
    };
  }

  async getProductById(id: string) {
    const product = await this.repo.findById(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    return product;
  }

  async getArrivalProducts(is_newArrival: boolean) {
    const products = await this.repo.findAll(is_newArrival);
    if (!products) {
      throw new AppError("New Arrival Products not found", 404);
    }
    return products;
  }

  async getFeaturedProducts(is_feature: boolean) {
    const products = await this.repo.findAll(undefined, is_feature);
    if (!products) {
      throw new AppError("Featured Products not found", 404);
    }
    return products;
  }
}
