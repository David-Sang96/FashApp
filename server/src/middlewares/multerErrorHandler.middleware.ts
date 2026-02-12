import multer from "multer";
import { AppError } from "../utils/AppError";

export const multerErrorHandler = (
  err: any,
  _req: any,
  _res: any,
  next: any,
) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return next(new AppError("Maximum 6 images allowed", 400));
    }

    if (err.code === "LIMIT_FILE_SIZE") {
      return next(new AppError("Each image must be under 5MB", 400));
    }
  }

  next(err);
};
