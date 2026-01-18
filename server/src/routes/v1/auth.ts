import express from "express";
import { protect } from "../../middlewares/protect.middleware";
import { validateRequest } from "../../middlewares/validateRequest.middlware";
import {
  changePasswordValidator,
  deactiveValidator,
  emailValidator,
  loginUserValidator,
  registerUserValidator,
  resendEmailValidator,
  resetPasswordValidator,
  tokenValidator,
} from "../../validators/auth.validator";
import {
  changePassword,
  checkAuth,
  deactivateAccount,
  loginUser,
  logoutUser,
  refresh,
  registerUser,
  resendEmail,
  resetPassword,
  sendForgetPasswordEmail,
  verifyEmail,
  verifyResetToken,
} from "./../../controllers/auth.controller";

const router = express.Router();

router.get("/verify-email", tokenValidator, validateRequest, verifyEmail);
router.get("/me", protect, checkAuth);
router.get(
  "/verify-reset-token",
  tokenValidator,
  validateRequest,
  verifyResetToken,
);

router.post("/register", registerUserValidator, validateRequest, registerUser);
router.post("/login", loginUserValidator, validateRequest, loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refresh);
router.post(
  "/forget-password",
  emailValidator,
  validateRequest,
  sendForgetPasswordEmail,
);
router.post(
  "/reset-password",
  resetPasswordValidator,
  validateRequest,
  resetPassword,
);
router.post("/resend", resendEmailValidator, validateRequest, resendEmail);

router.patch(
  "/change-password",
  protect,
  changePasswordValidator,
  validateRequest,
  changePassword,
);

router.delete(
  "/me",
  protect,
  deactiveValidator,
  validateRequest,
  deactivateAccount,
);

export default router;
