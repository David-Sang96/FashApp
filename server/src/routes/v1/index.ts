import express from "express";
import { protect } from "../../middlewares/protect.middleware";
import productRoutes from "./admin/product.admin";
import authRoutes from "./user";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/products", protect, productRoutes);

export default router;
