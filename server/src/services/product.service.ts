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
      filter["colors.name"] = {
        $in: colors.map((c) => new RegExp(`^${c}$`, "i")),
      }; //case-insensitive matching
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
    let sortOption: Record<string, 1 | -1> = {};
    if (sort === "new_arrivals") {
      filter.is_newArrival = true;
      sortOption = { createdAt: -1 };
    } else if (sort === "featured") {
      filter.is_feature = true;
      sortOption = { createdAt: -1 };
    } else {
      switch (sort) {
        case "price_asc":
          sortOption = { price: 1 };
          break;
        case "price_desc":
          sortOption = { price: -1 };
          break;
        case "newest":
          sortOption = { createdAt: -1 };
          break;
        default:
          sortOption = { createdAt: 1 };
      }
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(filter).sort(sortOption).skip(skip).limit(limit).lean(),
      Product.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);
    const hasPreviousPage = page > 1 ? true : false;
    const hasNextPage = page < totalPages ? true : false;
    const count = products.length;

    return {
      products,
      total,
      count,
      hasPreviousPage,
      hasNextPage,
      currentPage: page,
      totalPages,
    };
  }

  async getProductsCursor(options: ProductQueryOptions & { cursor?: string }) {
    // prettier-ignore
    const {search, category, colors,sizes,priceMin,priceMax,is_newArrival,is_feature,sort,cursor,limit = 12} = options;

    const filter: any = {};

    if (search) filter.name = { $regex: search, $options: "i" };
    if (category) filter.category = category;

    if (colors?.length) {
      filter["colors.name"] = {
        $in: colors.map((c) => new RegExp(`^${c}$`, "i")),
      };
    }

    if (sizes?.length) {
      filter.sizes = {
        $in: sizes.map((c) => new RegExp(`^${c}$`, "i")),
      };
    }

    if (priceMin !== undefined || priceMax !== undefined) {
      filter.price = {};
      if (priceMin !== undefined) filter.price.$gte = priceMin;
      if (priceMax !== undefined) filter.price.$lte = priceMax;
    }

    if (is_newArrival !== undefined) filter.is_newArrival = is_newArrival;
    if (is_feature !== undefined) filter.is_feature = is_feature;

    // Cursor-safe sorting
    let sortOption: Record<string, 1 | -1> = { _id: -1 };

    if (sort === "new_arrivals") {
      filter.is_newArrival = true;
      sortOption = { createdAt: -1, _id: -1 };
    } else if (sort === "featured") {
      filter.is_feature = true;
      sortOption = { createdAt: -1, _id: -1 };
    } else {
      switch (sort) {
        case "price_asc":
          sortOption = { price: 1, _id: -1 };
          break;
        case "price_desc":
          sortOption = { price: -1, _id: -1 };
          break;
        case "newest":
          sortOption = { createdAt: -1, _id: -1 };
          break;
        default:
          sortOption = { createdAt: 1, _id: 1 };
      }
    }

    // New document → bigger _id
    // Old document → smaller _id
    // Cursor condition: get older items
    if (cursor) filter._id = { $lt: cursor };

    const products = await Product.find(filter)
      .sort(sortOption)
      .limit(limit + 1)
      .lean();

    const hasMore = products.length > limit;
    if (hasMore) products.pop();

    const lastProduct = products[products.length - 1];

    return {
      products,
      nextCursor: lastProduct ? lastProduct._id : null,
      hasMore,
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

  async getProductsMetaData(value: string) {
    const products = await this.repo.findByMeta(value);
    if (!products) {
      throw new AppError("Meta Products not found", 404);
    }
    return products;
  }
}
