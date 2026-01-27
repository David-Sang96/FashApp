import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { AppError } from "../utils/AppError";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) throw new AppError(result.array()[0].msg, 400);
  next();
};

/* 
Important rule to remember
Middleware type	How to pass error
sync :	throw or next(err)
async	: next(err) only
*/
