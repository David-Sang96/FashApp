import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import { ENV_VARS } from "../config/envVars";
import { User } from "../models/user.model";
import { IUser } from "../types";
import { AppError } from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";

export interface CustomJwtPayload extends JwtPayload {
  userId: Types.ObjectId;
}

declare global {
  namespace Express {
    interface Request {
      userId?: Types.ObjectId;
      user?: IUser;
    }
  }
}

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      throw new AppError("No access token provided", 401);
    }

    const decoded = jwt.verify(
      accessToken,
      ENV_VARS.ACEESS_JWT_SECRET!
    ) as CustomJwtPayload;

    if (!decoded || !decoded.userId) {
      throw new AppError("Access token invalid or expired", 401);
    }

    const user = await User.findById(decoded.userId).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new AppError("User not found", 404);
    }

    req.userId = decoded.userId;
    req.user = user;
    next();
  }
);
