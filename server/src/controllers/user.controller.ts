import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { LoginResponse } from "../types/userType";
import { AppError } from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";

/**
 * @route   GET | /api/v1/users
 * @desc    Get all users
 * @access  Private
 */
export const allUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await UserService.getUsers();
  res.json({ success: true, users });
});

/**
 * @route   GET | /api/v1/users/:id
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
 * @route   PUT | /api/v1/users/me
 * @desc    Update user info
 * @access  Private
 */
export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!req.user) throw new AppError("Unauthorized", 401);

  const user = await UserService.updateUser(name, req.user);

  const response: LoginResponse = {
    success: true,
    message: "Updated successfully",
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
