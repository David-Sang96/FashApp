import { Request, Response } from "express";
import { ENV_VARS } from "../config/envVars";
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
  const { accessToken, refreshToken } = generateJwtTokens(newUser._id);

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
  console.log(password);

  const user = await User.findOne({ email });
  const isMatch = user && (await user.isMatchPassword(password));

  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false }); // Skip full validation
  const { accessToken, refreshToken } = generateJwtTokens(user._id);

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
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ success: true, message: "logged out successfully" });
});
