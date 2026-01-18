import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars";
import { CustomJwtPayload } from "../middlewares/protect.middleware";
import { User } from "../models/user.model";
import { AuthService } from "../services/auth.service";
import { LoginResponse } from "../types/userType";
import { AppError } from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";
import { generateJwtTokens } from "../utils/generateToken";
import { setTokensCookies } from "../utils/setTokenCookies";

const isProd = ENV_VARS.NODE_ENV === "production";

/**
 * @route   PPOST | api/v1/auth/register
 * @desc    Register new user
 * @access  Public
 */
export const registerUser = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  await AuthService.register(name, email, password);

  res.status(201).json({
    success: true,
    message: "Registration successful",
  });
});

/**
 * @route   POST | api/v1/auth/login
 * @desc    Login to existing user's account
 * @access  Public
 */
export const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await AuthService.login(email, password);

  const { accessToken, refreshToken } = generateJwtTokens(user.id);
  user.lastLogin = new Date();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  setTokensCookies(res, accessToken, refreshToken);

  const response: LoginResponse = {
    success: true,
    message: "Login successful",
    user: {
      _id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      lastLogin: user.lastLogin,
      emailVerified: user.emailVerified,
      provider: user.provider,
    },
  };
  res.json(response);
});

/**
 * @route   POST | /api/v1/auth/logout
 * @desc    Logout user account and clear token
 * @access  Public
 */
export const logoutUser = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    await User.findOneAndUpdate({ refreshToken }, { refreshToken: null });
  }
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
    })
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/api/v1/auth/refresh",
    })
    .json({ success: true, message: "Logout successful" });
});

/**
 * @route   GET | /api/v1/auth/me
 * @desc    Check Authentication
 * @access  Private
 */
export const checkAuth = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("User not authenticated", 401);

  const response: LoginResponse = {
    success: true,
    user: {
      _id: req.user._id.toString(),
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      lastLogin: req.user.lastLogin,
      emailVerified: req.user.emailVerified,
      provider: req.user.provider,
    },
  };
  //“Never store this response. Not in memory, not on disk, not in back/forward cache.”
  res.setHeader("Cache-Control", "no-store").json(response);
});

/**
 * @route   POST | api/v1/auth/refresh
 * @desc    Rotate JWT tokens (access + refresh)
 * @access  Public
 */
export const refresh = catchAsync(async (req: Request, res: Response) => {
  const oldToken = req.cookies.refreshToken;
  if (!oldToken) throw new AppError("No refresh token", 401);

  let decoded: CustomJwtPayload;

  try {
    decoded = jwt.verify(
      oldToken,
      ENV_VARS.REFRESH_JWT_SECRET!,
    ) as CustomJwtPayload;

    if (!decoded?.userId) {
      throw new AppError("Access token invalid or expired", 401);
    }
  } catch (err) {
    throw new AppError("Refresh token expired or invalid", 401);
  }

  const user = await User.findById(decoded.userId).select("+refreshToken");
  if (!user || user.refreshToken !== oldToken)
    throw new AppError("Invalid refresh token", 401);

  const { accessToken, refreshToken } = generateJwtTokens(user.id);
  user.refreshToken = refreshToken;
  await user.save();

  setTokensCookies(res, accessToken, refreshToken);

  res.json({
    success: true,
    message: "Tokens rotated",
  });
});

/**
 * @route   GET | api/v1/auth/verify-email
 * @desc    Email Verification
 * @access  Public
 */
export const verifyEmail = catchAsync(async (req, res) => {
  const { token } = req.query;

  if (!token || typeof token !== "string") {
    throw new AppError("Token missing", 400);
  }
  const user = await AuthService.verifyEmail(token);

  // Issue tokens (verification = login)
  const { accessToken, refreshToken } = generateJwtTokens(user.id);
  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });
  setTokensCookies(res, accessToken, refreshToken);

  const response: LoginResponse = {
    success: true,
    message: "Email verified and logged in successfully",
    user: {
      _id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      lastLogin: user.lastLogin,
      emailVerified: user.emailVerified,
      provider: user.provider,
    },
  };
  res.json(response);
});

/**
 * @route   PATCH | api/v1/auth/change-password
 * @desc    Update the password
 * @access  Private
 */
export const changePassword = catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!req.user) throw new AppError("Unauthorized", 401);

  await AuthService.changePassword(currentPassword, newPassword, req.user);

  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
    })
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/api/v1/auth/refresh",
    })
    .json({ success: true, message: "Password updated.Please login again" });
});

/**
 * @route   DELETE | api/v1/auth/me
 * @desc    Account delection
 * @access  Private
 */
export const deactivateAccount = catchAsync(
  async (req: Request, res: Response) => {
    const { password } = req.body;
    if (!req.user) throw new AppError("Unauthorized", 401);

    await AuthService.deactivate(req.user, password);
    res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        path: "/",
      })
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        path: "/api/v1/auth/refresh",
      })
      .json({ success: true, message: "Account deactivated" });
  },
);

/**
 * @route   POST | api/v1/auth/forget-password
 * @desc    Send email for forget password
 * @access  Public
 */
export const sendForgetPasswordEmail = catchAsync(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    await AuthService.forgetPasswordEmail(email);
    res.json({ success: true, message: "Reset password email sent" });
  },
);

/**
 * @route   POST | api/v1/auth/reset-password
 * @desc    Reset the password
 * @access  Public
 */
export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { newPassword } = req.body;
  const { token } = req.query;

  if (!token || typeof token !== "string") {
    throw new AppError("Token missing", 400);
  }

  await AuthService.resetPassword(token, newPassword);
  res.json({ success: true, message: "Password reset successful" });
});

/**
 * @route   POST | api/v1/auth/resend
 * @desc    Resend the email for token
 * @access  Public
 */
export const resendEmail = catchAsync(async (req, res) => {
  const { email, type } = req.body;

  await AuthService.resendEmail(email, type);
  res.json({
    success: true,
    message: `${type === "verify" ? "Verification" : "Password reset"} email sent successfully`,
  });
});

export const verifyResetToken = catchAsync(async (req, res) => {
  const { token } = req.query;

  if (!token || typeof token !== "string") {
    throw new AppError("Token missing", 400);
  }
  const user = await AuthService.verifyResetToken(token);

  res.json({
    success: true,
    message: "Token is valid",
    email: user.email,
  });
});
