import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { AppError } from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";

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
 * @route   DELETE | api/v1/auth/me
 * @desc    Account delection
 * @access  Private
 */

export const deactivateAccount = catchAsync(
  async (req: Request, res: Response) => {
    const { password } = req.body;
    if (!req.user) throw new AppError("Unauthorized", 401);

    await UserService.deleteUser(req.user, password);
    res.json({ success: true, message: "Account deactivated" });
  }
);
