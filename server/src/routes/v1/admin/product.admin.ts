import express from "express";

import {
  createProduct,
  deleteProduct,
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
import { validateRequest } from "../../../middlewares/validateRequest.middlware";
import {
  createProductValidator,
  productIDValidator,
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
  createProductValidator,
  validateRequest,
  createProduct,
);
router.put(
  "/:id",
  adminLimiter,
  isAdmin,
  productIDValidator,
  updateProductValidator,
  validateRequest,
  updateProduct,
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
