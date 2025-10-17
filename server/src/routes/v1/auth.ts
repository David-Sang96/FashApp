import express from "express";
import {
  loginUser,
  logoutUser,
  refresh,
  registerUser,
} from "../../controllers/user.controller";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refresh);

export default router;
