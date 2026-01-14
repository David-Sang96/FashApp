import express from "express";
import { protect } from "../../middlewares/protect.middleware";
import { validateRequest } from "../../middlewares/validateRequest.middlware";
import {
  changePasswordValidator,
  loginUserValidator,
  registerUserValidator,
} from "../../validators/auth.validator";
import {
  changePassword,
  checkAuth,
  loginUser,
  logoutUser,
  refresh,
  registerUser,
  verifyEmail,
} from "./../../controllers/auth.controller";

const router = express.Router();

router.get("/verify-email", verifyEmail);
router.get("/me", protect, checkAuth);

router.post("/register", registerUserValidator, validateRequest, registerUser);
router.post("/login", loginUserValidator, validateRequest, loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refresh);

router.patch(
  "/change-password",
  protect,
  changePasswordValidator,
  validateRequest,
  changePassword
);

export default router;
