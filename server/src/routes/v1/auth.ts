import express from "express";

import { protect } from "../../middlewares/protect.middleware";
import { authLimiter } from "../../middlewares/rateLimitter.middleware";
import { upload } from "../../middlewares/upload.middleware";
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
  uploadImageValidator,
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
  uploadOrUpdateAvatar,
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

router.post(
  "/register",
  authLimiter,
  registerUserValidator,
  validateRequest,
  registerUser,
);
router.post(
  "/login",
  authLimiter,
  loginUserValidator,
  validateRequest,
  loginUser,
);
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
router.post(
  "/upload",
  protect,
  upload.single("avatar"), // multer populates req.file
  uploadImageValidator, // now validator can see req.file
  validateRequest,
  uploadOrUpdateAvatar,
);

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
