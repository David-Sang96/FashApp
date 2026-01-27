import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ENV_VARS } from "../config/envVars";
import { AppError } from "../utils/AppError";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err instanceof AppError ? err.statusCode : 500;
  let message = err.message || "Internal Server Error";
  let email = err instanceof AppError ? err.email : undefined;

  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    // Extract all messages
    const messages = Object.values(err.errors).map((el: any) => el.message);

    // Deduplicate identical messages
    const uniqueMessages = Array.from(new Set(messages));

    // Join for response
    message = uniqueMessages.join(", ");
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message,
    email,
    stack: ENV_VARS.NODE_ENV === "development" && err.stack,
  });
};
