import { Request, Response } from "express";
import { CreateProductDTO, UpdateProductDTO } from "../../dtos/product.dto";
import { Product } from "../../models/product.model";
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
  const product = await productService.updateProduct(
    req.params.id as string,
    data,
  );
  res.json({ success: true, message: "Product updated successfully", product });
});

/**
 * @route   DELETE | api/v1/products/:id
 * @desc    delete existing product
 * @access  Private
 */
export const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  await productService.deleteProduct(req.params.id as string);
  res.json({ success: true, message: "Product deleted successfully" });
});

/**
 * @route   GET | /api/v1/products
 * @desc    Get products using page pagination
 * @access  Private
 */
export const getAllProducts = catchAsync(
  async (req: Request, res: Response) => {
    // prettier-ignore
    const {search,category,sizes,colors,priceMin,priceMax,is_newArrival,is_feature,sort,page,limit } = req.query;

    const colorArray = colors ? (colors as string).split(",") : [];
    const sizeArray = sizes ? (sizes as string).split(",") : [];
    const categoryArray = category ? (category as string).split(",") : [];

    // prettier-ignore
    const newArrival = is_newArrival === "true" ? true : is_newArrival === "false" ? false : undefined;

    const feature =
      is_feature === "true" ? true : is_feature === "false" ? false : undefined;

    const result = await productService.getProducts({
      search: search as string,
      category: categoryArray,
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
    const products = await productService.getArrivalProducts(true);
    res.json({ success: true, products });
  },
);

/**
 * @route   GET | /api/v1/products/feature
 * @desc    Get all featured products
 * @access  Private
 */
export const getFeaturedProducts = catchAsync(
  async (req: Request, res: Response) => {
    const products = await productService.getFeaturedProducts(true);
    res.json({ success: true, products });
  },
);

/**
 * @route   GET | /api/v1/products/:id
 * @desc    Get product base on ID
 * @access  Private
 */
export const getProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await productService.getProductById(req.params.id as string);
  res.json({ success: true, product });
});

/**
 * @route   GET | /api/v1/products/filters/meta
 * @desc    Get products meta data
 * @access  Private
 */
export const getProductsMeta = catchAsync(
  async (req: Request, res: Response) => {
    const sizes = await productService.getProductsMetaData("sizes");
    const categories = await productService.getProductsMetaData("category");
    const totalProductOfEachCategory = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          total: 1,
        },
      },
    ]);
    const colors = await Product.aggregate([
      { $unwind: "$colors" },
      {
        $group: {
          _id: "$colors.name", // group by NAME only
          hex: { $first: "$colors.hex" }, // take the first hex for this name
        },
      },
      { $replaceRoot: { newRoot: { name: "$_id", hex: "$hex" } } },
    ]);

    const priceRange = await Product.aggregate([
      {
        $group: {
          _id: null,
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
    ]);

    res.json({
      colors,
      sizes,
      categories,
      totalProductOfEachCategory,
      minPrice: priceRange[0]?.minPrice || 0,
      maxPrice: priceRange[0]?.maxPrice || 0,
    });
  },
);

/**
 * @route   GET | /api/v1/products/cursor
 * @desc    Get products using cursor pagination
 * @access  Private
 */
export const getProductsCursor = catchAsync(
  async (req: Request, res: Response) => {
    // prettier-ignore
    const {search,category,sizes,colors,priceMin,priceMax,is_newArrival,is_feature,sort,cursor,limit } = req.query;

    const colorArray = colors ? (colors as string).split(",") : [];
    const sizeArray = sizes ? (sizes as string).split(",") : [];
    const categoryArray = category ? (category as string).split(",") : [];

    // prettier-ignore
    const newArrival = is_newArrival === "true" ? true : is_newArrival === "false" ? false : undefined;

    const feature =
      is_feature === "true" ? true : is_feature === "false" ? false : undefined;

    const result = await productService.getProductsCursor({
      search: search as string,
      category: categoryArray,
      colors: colorArray,
      sizes: sizeArray,
      priceMin: priceMin ? Number(priceMin) : undefined,
      priceMax: priceMax ? Number(priceMax) : undefined,
      is_newArrival: newArrival,
      is_feature: feature,
      sort: sort as string,
      cursor: cursor as string | undefined,
      limit: limit ? Number(limit) : 12,
    });

    res.json({ success: true, result });
  },
);
