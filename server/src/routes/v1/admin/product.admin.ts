import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../../../controllers/admin/product.admin.controller";
import { isAdmin } from "../../../middlewares/auth.middleware";
import { validateRequest } from "../../../middlewares/validateRequest.middlware";
import {
  createProductValidator,
  productIDValidator,
  updateProductValidator,
} from "../../../validators/product.validator";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", productIDValidator, validateRequest, getProduct);
router.post(
  "/",
  isAdmin,
  createProductValidator,
  validateRequest,
  createProduct
);
router.put(
  "/:id",
  isAdmin,
  productIDValidator,
  updateProductValidator,
  validateRequest,
  updateProduct
);
router.delete(
  "/:id",
  isAdmin,
  productIDValidator,
  validateRequest,
  deleteProduct
);

export default router;
