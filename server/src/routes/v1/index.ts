import express from "express";
import { isAdmin } from "../../middlewares/auth.middleware";
import { protect } from "../../middlewares/protect.middleware";
import productRoutes from "./admin/product.admin";
import authRoutes from "./auth";

const router = express.Router();

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/products", protect, isAdmin, productRoutes);

export default router;
