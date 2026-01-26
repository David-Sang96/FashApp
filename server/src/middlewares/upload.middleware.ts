import multer from "multer";
import { AppError } from "../utils/AppError";

const multerStorage = multer.memoryStorage();

const allowedExtensions = ["jpg", "jpeg", "png", "webp"];

const multerFilter = (_req: any, file: Express.Multer.File, cb: any) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new AppError("Only image files are allowed!", 400), false);
  }

  const ext = file.originalname.split(".").pop()?.toLowerCase();

  if (!ext || !allowedExtensions.includes(ext)) {
    return cb(new AppError("Invalid image file extension", 400), false);
  }

  cb(null, true);
};

export const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 5_000_000 },
});
