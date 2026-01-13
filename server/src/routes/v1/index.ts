import express from "express";
import passport from "passport";
import { ENV_VARS } from "../../config/envVars";
import { protect } from "../../middlewares/protect.middleware";
import { generateJwtTokens } from "../../utils/generateToken";
import { setTokensCookies } from "../../utils/setTokenCookies";
import productRoutes from "./admin/product.admin";
import authRoutes from "./user";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/products", protect, productRoutes);

// start google login
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user;

    const { accessToken, refreshToken } = generateJwtTokens(user?.id);
    setTokensCookies(res, accessToken, refreshToken);

    res.redirect(ENV_VARS.CLIENT_URL!);
  }
);

export default router;
