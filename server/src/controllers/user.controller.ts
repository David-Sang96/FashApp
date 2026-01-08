import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars";
import { CustomJwtPayload } from "../middlewares/protect.middleware";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";
import { LoginResponse } from "../types/userType";
import { AppError } from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";
import { generateJwtTokens } from "../utils/generateToken";
import { setTokensCookies } from "../utils/setTokenCookies";

/**
 * @route   PPOST | api/v1/auth/register
 * @desc    Register new user
 * @access  Public
 */
export const registerUser = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const newUser = await UserService.register(name, email, password);
  const { accessToken, refreshToken } = generateJwtTokens(newUser._id);

  // Save refresh token in DB
  newUser.refreshToken = refreshToken;
  await newUser.save({ validateBeforeSave: false }); // Skip full validation

  // Set cookies using helper
  setTokensCookies(res, accessToken, refreshToken);

  res.status(201).json({
    success: true,
    message: "Register successful",
    user: {
      _id: newUser._id.toString(),
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      createdAt: newUser.createdAt,
    },
  });
});

/**
 * @route   POST | api/v1/auth/login
 * @desc    Login to existing user's account
 * @access  Public
 */
export const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserService.login(email, password);
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
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
    })
    .clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
    })
    .json({ success: true, message: "Logout successful" });
});

/**
 * @route   GET | /api/v1/auth/users
 * @desc    Get all users
 * @access  Private
 */
export const allUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await UserService.getUsers();
  res.json({ success: true, users });
});

/**
 * @route   GET | /api/v1/auth/user/:id
 * @desc    Get user base on ID
 * @access  Private
 */
export const singleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.getUser(id);
  if (!user) throw new AppError("User not found", 404);
  res.json({ success: true, user });
});

/**
 * @route   POST | api/v1/auth/refresh
 * @desc    Rotate JWT tokens (access + refresh)
 * @access  Public
 */
export const refresh = catchAsync(async (req: Request, res: Response) => {
  const oldToken = req.cookies.refreshToken;
  if (!oldToken) throw new AppError("No refresh token", 401);
  const decoded = jwt.verify(
    oldToken,
    ENV_VARS.REFRESH_JWT_SECRET!
  ) as CustomJwtPayload;

  const user = await User.findById(decoded.userId);
  if (!user || user.refreshToken !== oldToken)
    throw new AppError("Invalid refresh token", 403);

  const { accessToken, refreshToken } = generateJwtTokens(user.id);
  user.refreshToken = refreshToken;
  await user.save();

  setTokensCookies(res, accessToken, refreshToken);

  res.json({
    success: true,
    message: "Tokens rotated",
  });
});
