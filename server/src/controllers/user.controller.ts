import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars";
import { CustomJwtPayload } from "../middlewares/protect.middleware";
import { User } from "../models/user.model";
import { AppError } from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";
import { generateJwtTokens } from "../utils/generateToken";

// @route POST | api/v1/auth/register
// @desc Register new user
// @access Public
export const registerUser = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new AppError("User already exists", 409);
  const newUser = await User.create({ name, email, password });
  const { accessToken, refreshToken } = generateJwtTokens(newUser.id);
  newUser.refreshToken = refreshToken;
  await newUser.save({ validateBeforeSave: false });

  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: ENV_VARS.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
      sameSite: "none",
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: ENV_VARS.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "none",
    })
    .status(201)
    .json({
      success: true,
      message: "Register successfull",
      user: {
        _id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        createdAt: newUser.createdAt,
      },
    });
});

// @route POST | api/v1/auth/login
// @desc Login to existing user's account
// @access Public
export const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const isMatch = user && (await user.isMatchPassword(password));

  if (!isMatch) throw new AppError("Invalid email or password", 401);

  const { accessToken, refreshToken } = generateJwtTokens(user.id);
  user.lastLogin = new Date();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false }); // Skip full validation

  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: ENV_VARS.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
      sameSite: "none",
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: ENV_VARS.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Login successfull",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        lastLogin: user.lastLogin,
      },
    });
});

// @route POST | api/v1/auth/logut
// @desc logout user account and clear token
// @access Public
export const logoutUser = catchAsync(async (req: Request, res: Response) => {
  if (req.userId) {
    await User.findByIdAndUpdate(req.userId, { refreshToken: null });
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

// @route POST | api/v1/auth/refresh
// @desc  Rotate JWT tokens (access + refresh)
// @access Public
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

  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: ENV_VARS.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
      sameSite: "none",
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: ENV_VARS.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Tokens rotated",
    });
});
