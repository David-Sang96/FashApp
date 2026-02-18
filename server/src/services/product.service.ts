import { v2 as cloudinary } from "cloudinary";
import { Request } from "express";
import { Types } from "mongoose";
import sharp from "sharp";
import { uploadOne } from "../config/cloudinary";
import { buildProductsCacheKey, redis } from "../config/redis";
import { sanitizeRichText } from "../config/sanitizeHtml";
import {
  CreateProductDTO,
  ProductQueryOptions,
  UpdateProductDTO,
} from "../dtos/product.dto";
import { Product } from "../models/product.model";
import { ProductRepository } from "../repositories/product.repository";
import { Image } from "../types/productType";
import { AppError } from "../utils/AppError";

export class ProductService {
  constructor(private repo = new ProductRepository()) {}

  private async clearProductsCache() {
    const keys = await redis.keys("products:*");
    if (keys.length > 0) {
      await redis.del(keys);
    }
  }

  async createProduct(req: Request) {
    if (!req.user) throw new AppError("User not authenticated", 401);
    const files = req.files as Express.Multer.File[];
    const { description, ...rest } = req.body as CreateProductDTO;

    if (!description || typeof description !== "string") {
      throw new AppError("Invalid description", 400);
    }
    const cleanDescription = sanitizeRichText(description);
    if (!files.length) throw new AppError("No file uploaded", 400);

    //Process image with Sharp
    let processedBuffers: Buffer[];

    try {
      processedBuffers = await Promise.all(
        files.map((file) =>
          sharp(file.buffer)
            .resize({
              width: 1000,
              height: 1000,
              fit: "inside",
              withoutEnlargement: true,
            })
            .webp({ quality: 90 })
            .toBuffer(),
        ),
      );
    } catch {
      throw new AppError("Invalid image file", 400);
    }

    const uploadedImages = await Promise.all(
      processedBuffers.map((buffer) => uploadOne(buffer, "fashApp/products")),
    );

    const product = await this.repo.create({
      ...rest,
      description: cleanDescription,
      userId: req.user._id,
      images: uploadedImages,
    });

    if (!product) throw new AppError("Product creation failed");
    await this.clearProductsCache();
    return product;
  }

  async updateProduct(req: Request) {
    const { description, ...rest } = req.body as UpdateProductDTO;
    const files = req.files as Express.Multer.File[] | undefined;
    const id = req.params.id as string;
    const existingProduct = await this.repo.findById(id);

    let cleanDescription: string | undefined;
    if (typeof description === "string") {
      cleanDescription = sanitizeRichText(description);
    }
    if (!existingProduct) throw new AppError("Product not found", 404);
    let uploadedImages: Image[] = [];

    if (files && files.length > 0) {
      try {
        // Process images
        const processedBuffers = await Promise.all(
          files.map((file) =>
            sharp(file.buffer)
              .resize({
                width: 1000,
                height: 1000,
                fit: "inside",
                withoutEnlargement: true,
              })
              .webp({ quality: 90 })
              .toBuffer(),
          ),
        );

        uploadedImages = await Promise.all(
          processedBuffers.map((buffer) =>
            uploadOne(buffer, "fashApp/products"),
          ),
        );
      } catch {
        throw new AppError("Invalid image file", 400);
      }
    }

    const updated = await this.repo.updateById(String(existingProduct._id), {
      ...rest,
      ...(cleanDescription && { description: cleanDescription }),
      ...(uploadedImages.length > 0 && {
        images: [...(existingProduct.images ?? []), ...uploadedImages],
      }),
    });

    if (!updated) throw new AppError("Product not found", 404);
    await this.clearProductsCache();
    return updated;
  }

  async deleteProduct(id: string) {
    const existingProduct = await this.repo.findById(id);
    if (!existingProduct) throw new AppError("Product not found", 404);

    const publicIds = existingProduct.images.map((item) => item.public_id);

    // Instead of deleting one by one: Use bulk delete:
    //✔ Faster
    // ✔ Fewer API calls
    // ✔ More scalable
    try {
      if (publicIds.length) {
        await cloudinary.api.delete_resources(publicIds);
      }
    } catch (error) {
      console.error(
        "Cloudinary delete image failed in deleting product:",
        error,
      );
    }

    const deleted = await this.repo.deleteById(existingProduct._id);
    await this.clearProductsCache();
    return deleted;
  }

  async getProductsByUserId(id: Types.ObjectId) {
    const products = await this.repo.findByUserId(id);
    return products;
  }

  async getProducts(options: ProductQueryOptions) {
    // prettier-ignore
    const {search, category, colors,sizes,priceMin,priceMax,is_newArrival,is_feature,sort,page = 1,limit = 12} = options;

    const shouldCache = !search || search.length >= 3;
    const categoryArr = Array.isArray(category) ? category : [];
    const colorsArr = Array.isArray(colors) ? colors : [];
    const sizesArr = Array.isArray(sizes) ? sizes : [];

    const cacheKey = buildProductsCacheKey("products:page", {
      search: shouldCache ? search : undefined,
      category: categoryArr.slice().sort(),
      colors: colorsArr.slice().sort(),
      sizes: sizesArr.slice().sort(),
      priceMin,
      priceMax,
      is_newArrival,
      is_feature,
      sort,
      page,
      limit,
    });

    // 1️⃣ try cache
    if (shouldCache) {
      const cached = await redis.get(cacheKey);
      if (cached) {
        console.log("🟢 REDIS HIT:", cacheKey);
        return JSON.parse(cached);
      }
      console.log("🔴 REDIS MISS:", cacheKey);
    }

    const filter: any = {};

    if (search) filter.name = { $regex: search, $options: "i" }; // text search
    if (category?.length) {
      filter.category = {
        $in: category.map((c) => new RegExp(`^${c}$`, "i")),
      };
    }
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

    const result = {
      products,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      hasPreviousPage: page > 1,
      hasNextPage: page * limit < total,
    };

    // 3. save to redis (TTL!)
    if (shouldCache) {
      await redis.set(cacheKey, JSON.stringify(result), "EX", 60);
    }

    return result;
  }

  async getProductsCursor(options: ProductQueryOptions & { cursor?: string }) {
    const cacheKey = buildProductsCacheKey("products:cursor", options);

    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

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

    const result = {
      products,
      nextCursor: lastProduct ? lastProduct._id : null,
      hasMore,
    };

    await redis.set(cacheKey, JSON.stringify(result), "EX", 60);

    return result;
  }

  async getProductById(id: string) {
    const product = await this.repo.findById(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    return product;
  }

  async getArrivalProducts(is_newArrival: boolean) {
    const cacheKey = `products:newArrival:${is_newArrival}`;

    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const products = await this.repo.findNewOrFeature(is_newArrival);
    if (!products) {
      throw new AppError("New Arrival Products not found", 404);
    }
    return products;
  }

  async getFeaturedProducts(is_feature: boolean) {
    const cacheKey = `products:isFeatured:${is_feature}`;

    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);
    const products = await this.repo.findNewOrFeature(undefined, is_feature);
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
