import express from "express";
import {
  allUsers,
  checkAuth,
  loginUser,
  logoutUser,
  refresh,
  registerUser,
  singleUser,
} from "../../controllers/user.controller";
import { protect } from "../../middlewares/protect.middleware";
import { validateRequest } from "../../middlewares/validateRequest.middlware";
import {
  loginUserValidator,
  registerUserValidator,
  userIDValidator,
} from "../../validators/user.validator";
import { verifyEmail } from "./../../controllers/user.controller";

const router = express.Router();

router.post("/register", registerUserValidator, validateRequest, registerUser);
router.get("/verify-email", verifyEmail);
router.post("/login", loginUserValidator, validateRequest, loginUser);
router.post("/logout", logoutUser);
router.get("/user/:id", protect, userIDValidator, validateRequest, singleUser);
router.get("/me", protect, checkAuth);
router.get("/users", protect, allUsers);
router.post("/refresh", refresh);

export default router;
