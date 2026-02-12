import express from "express";

import {
  createProduct,
  deleteProduct,
  deleteProductImage,
  getAllProducts,
  getAllProductsByUserId,
  getFeaturedProducts,
  getNewArrivalProducts,
  getProduct,
  getProductsCursor,
  getProductsMeta,
  updateProduct,
} from "../../../controllers/admin/product.admin.controller";
import { isAdmin } from "../../../middlewares/auth.middleware";
import {
  adminLimiter,
  publicLimiter,
} from "../../../middlewares/rateLimitter.middleware";
import { upload } from "../../../middlewares/upload.middleware";
import { validateRequest } from "../../../middlewares/validateRequest.middlware";

import {
  createProductValidator,
  productIDValidator,
  productUploadImageValidator,
  updateProductValidator,
} from "../../../validators/product.validator";

const router = express.Router();

router.get("/", publicLimiter, getAllProducts);
router.get("/cursor", publicLimiter, getProductsCursor);
router.get("/filters/meta", publicLimiter, getProductsMeta);
router.get("/new-arrival", publicLimiter, getNewArrivalProducts);
router.get("/feature", publicLimiter, getFeaturedProducts);

router.get("/admin/all", adminLimiter, isAdmin, getAllProductsByUserId);

router.get(
  "/:id",
  publicLimiter,
  productIDValidator,
  validateRequest,
  getProduct,
);

router.post(
  "/",
  adminLimiter,
  isAdmin,
  upload.array("images", 6),
  productUploadImageValidator,
  validateRequest,
  createProductValidator,
  validateRequest,
  createProduct,
);

router.put(
  "/:id",
  adminLimiter,
  isAdmin,
  upload.array("images", 6),
  productUploadImageValidator,
  validateRequest,
  productIDValidator,
  validateRequest,
  updateProductValidator,
  validateRequest,
  updateProduct,
);

router.delete(
  "/:productId/image/:publicId",
  adminLimiter,
  isAdmin,
  deleteProductImage,
);

router.delete(
  "/:id",
  adminLimiter,
  isAdmin,
  productIDValidator,
  validateRequest,
  deleteProduct,
);

export default router;
