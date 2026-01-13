import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import { ENV_VARS } from "../config/envVars";
import { User } from "../models/user.model";
import { IUser } from "../types/userType";
import { AppError } from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";

export interface CustomJwtPayload extends JwtPayload {
  userId: Types.ObjectId;
}

declare global {
  namespace Express {
    // use 'User' here because Express/Passport often expect the interface to be named 'User'
    interface User extends IUser {}
    interface Request {
      userId?: Types.ObjectId;
      user?: User;
    }
  }
}

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      throw new AppError("No access token provided", 401);
    }

    let decoded: CustomJwtPayload;

    try {
      decoded = jwt.verify(
        accessToken,
        ENV_VARS.ACCESS_JWT_SECRET!
      ) as CustomJwtPayload;

      // extra safety
      if (!decoded?.userId) {
        throw new AppError("Access token invalid or expired", 401);
      }
    } catch (err) {
      throw new AppError("Access token invalid or expired", 401);
    }

    /* 
     if token is expired or invalid → jwt.verify already throws
     code never reaches the if (!decoded) check
     your custom error never runs
     catchAsync won’t catch it because it’s sync throw
     so the if (!decoded || !decoded.userId) is kinda useless as-is.

     if (!decoded || !decoded.userId) {
      throw new AppError("Access token invalid or expired", 401);
     }
    */

    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    req.userId = decoded.userId;
    req.user = user;
    next();
  }
);
