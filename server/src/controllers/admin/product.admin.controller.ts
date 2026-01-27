import { Request, Response } from "express";
import { CreateProductDTO, UpdateProductDTO } from "../../dtos/product.dto";
import { ProductService } from "../../services/product.service";
import { AppError } from "../../utils/AppError";
import { catchAsync } from "../../utils/catchAsync";

const productService = new ProductService();

/**
 * @route   POST | api/v1/products
 * @desc    create new product
 * @access  Private
 */
export const createProduct = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("User not authenticated", 401);
  const data = req.body as CreateProductDTO;
  const product = await productService.createProduct(data, req.user._id);
  res
    .status(201)
    .json({ success: true, message: "Product created successfully", product });
});

/**
 * @route   PUT | api/v1/products/:id
 * @desc    update existing product
 * @access  Private
 */
export const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const data = req.body as UpdateProductDTO;
  const product = await productService.updateProduct(req.params.id, data);
  res.json({ success: true, message: "Product updated successfully", product });
});

/**
 * @route   DELETE | api/v1/products/:id
 * @desc    delete existing product
 * @access  Private
 */
export const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  await productService.deleteProduct(req.params.id);
  res.json({ success: true, message: "Product deleted successfully" });
});

/**
 * @route   GET | /api/v1/products
 * @desc    Get all products / with filters
 * @access  Private
 */
export const getAllProducts = catchAsync(
  async (req: Request, res: Response) => {
    // prettier-ignore
    const {search,category,sizes,colors,priceMin,priceMax,is_newArrival,is_feature,sort,page,limit } = req.query;

    const colorArray = colors ? (colors as string).split(",") : [];
    const sizeArray = sizes ? (sizes as string).split(",") : [];

    // prettier-ignore
    const newArrival = is_newArrival === "true" ? true : is_newArrival === "false" ? false : undefined;

    // prettier-ignore
    const feature = is_feature === "true" ? true : is_feature === "false" ? false : undefined;

    const result = await productService.getProducts({
      search: search as string,
      category: category as string,
      colors: colorArray,
      sizes: sizeArray,
      priceMin: priceMin ? Number(priceMin) : undefined,
      priceMax: priceMax ? Number(priceMax) : undefined,
      is_newArrival: newArrival,
      is_feature: feature,
      sort: sort as string,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 12,
    });

    res.json({ success: true, result });
  },
);

/**
 * @route   GET | /api/v1/products/new-arrival
 * @desc    Get all new arrival products
 * @access  Private
 */
export const getNewArrivalProducts = catchAsync(
  async (req: Request, res: Response) => {
    const product = await productService.getArrivalProducts(true);
    res.json({ success: true, product });
  },
);

/**
 * @route   GET | /api/v1/products/feature
 * @desc    Get all featured products
 * @access  Private
 */
export const getFeaturedProducts = catchAsync(
  async (req: Request, res: Response) => {
    const product = await productService.getFeaturedProducts(true);
    res.json({ success: true, product });
  },
);

/**
 * @route   GET | /api/v1/products/:id
 * @desc    Get product base on ID
 * @access  Private
 */
export const getProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await productService.getProductById(req.params.id);
  res.json({ success: true, product });
});
