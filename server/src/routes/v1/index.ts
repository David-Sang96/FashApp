import express from "express";
import passport from "passport";
import { ENV_VARS } from "../../config/envVars";
import { protect } from "../../middlewares/protect.middleware";
import { trackUserActivity } from "../../middlewares/trackUserActivity.middleware";
import { User } from "../../models/user.model";
import { generateJwtTokens } from "../../utils/generateToken";
import { setTokensCookies } from "../../utils/setTokenCookies";
import productRoutes from "./admin/product.admin";
import authRoutes from "./auth";
import userRoutes from "./user";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", protect, trackUserActivity, userRoutes);
router.use("/products", protect, trackUserActivity, productRoutes);

// start google login
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

// callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${ENV_VARS.CLIENT_URL}/login?error=google_email_exists`,
  }),
  async (req, res) => {
    const user = req.user;

    if (!user) {
      // extra safety, usually handled by failureRedirect
      return res.redirect(
        `${ENV_VARS.CLIENT_URL}/login?error=google_email_exists`,
      );
    }

    if (!user.active) {
      return res.redirect(
        `${ENV_VARS.CLIENT_URL}/login?error=account_deactive`,
      );
    }

    const { accessToken, refreshToken } = generateJwtTokens(user?.id);
    await User.findByIdAndUpdate(user.id, {
      refreshToken,
    });
    setTokensCookies(res, accessToken, refreshToken);

    res.redirect(ENV_VARS.CLIENT_URL!);
  },
);

export default router;
