import { HydratedDocument, Types } from "mongoose";
import { Product } from "../models/product.model";
import { IProduct } from "../types/productType";

export class ProductRepository {
  // Partial<IProduct> makes all product fields optional, even if some are required in IProduct
  async create(data: Partial<IProduct>) {
    return Product.create(data);
  }

  async findById(id: string) {
    return Product.findById(id);
  }

  async findByUserId(id: Types.ObjectId) {
    return Product.find({ userId: id }).sort({ createdAt: -1 }).lean();
  }

  async findNewOrFeature(is_newArrival?: boolean, is_feature?: boolean) {
    const filter: any = {};
    if (is_newArrival) filter.is_newArrival = true;
    if (is_feature) filter.is_feature = true;

    return Product.find(filter).sort({ createdAt: -1 }).lean();
  }

  async updateById(id: string, data: Partial<IProduct>) {
    return Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: Types.ObjectId) {
    return Product.findByIdAndDelete(id);
  }

  async findByEmail(email: string, includePassword = false) {
    if (includePassword) {
      return Product.findOne({ email }).select("+password -__v").exec();
    }
    return Product.findOne({ email }).exec();
  }

  async findByMeta(value: string) {
    if (value.includes("colors")) {
      return Product.distinct(`colors.${value}`);
    }
    return Product.distinct(value);
  }

  async save(product: HydratedDocument<IProduct>) {
    return product.save({ validateBeforeSave: false });
  }
}
