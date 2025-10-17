import { Request, Response } from "express";
import { Types } from "mongoose";
import { Product } from "../../models/product.model";
import { AppError } from "../../utils/AppError";
import { catchAsync } from "../../utils/catchAsync";

// @route POST | api/v1/products
// @desc  create new product
// @access Private
export const createProduct = catchAsync(async (req: Request, res: Response) => {
  const {
    name,
    description,
    price,
    instock_count,
    category,
    sizes,
    colors,
    images,
    is_newArrival,
    is_feature,
    rating_count,
  } = req.body;
  const product = await Product.create({
    name,
    description,
    price,
    instock_count,
    category,
    sizes,
    colors,
    images,
    is_newArrival,
    is_feature,
    rating_count,
    userId: req.userId,
  });

  res
    .status(201)
    .json({ success: true, message: "Product created successfully", product });
});

// @route PUT | api/v1/products/:id
// @desc update existing product
// @access Private
export const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id))
    throw new AppError("Invalid product ID", 400);

  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) throw new AppError("Product not found", 404);
  res.json({ success: true, message: "Product updated successfully", product });
});

// @route DELETE | api/v1/products/:id
// @desc delete existing product
// @access Private
export const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) throw new AppError("Invalid mongo ID", 400);

  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new AppError("Product not found", 404);
  res.json({ success: true, message: "Product deleted successfully" });
});
