import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";

export const isAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) throw new AppError("User not found", 404);
    if (user.role !== "admin")
      throw new AppError("You are not allowed to access this resource", 403);
    next();
  }
);
