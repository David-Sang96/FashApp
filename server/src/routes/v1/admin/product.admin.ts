import express from "express";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../../controllers/admin/product.admin.controller";
import { validateRequest } from "../../../middlewares/validateRequest.middlware";
import {
  createProductValidator,
  deleteProductValidator,
  updateProductValidator,
} from "../../../validators/product.validators";

const router = express.Router();

router.post("/", createProductValidator, validateRequest, createProduct);
router.put("/:id", updateProductValidator, validateRequest, updateProduct);
router.delete("/:id", deleteProductValidator, validateRequest, deleteProduct);

export default router;
