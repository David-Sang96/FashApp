import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";

export const trackUserActivity = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user) {
    await User.findByIdAndUpdate(req.user._id, {
      lastActiveAt: new Date(),
    });
  }

  next();
};
