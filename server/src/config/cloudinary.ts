import { v2 as cloudinary } from "cloudinary";
import { AppError } from "../utils/AppError";
import { ENV_VARS } from "./envVars";

cloudinary.config({
  cloud_name: ENV_VARS.CLOUDINARY_CLOUD_NAME,
  api_key: ENV_VARS.CLOUDINARY_API_KEY,
  api_secret: ENV_VARS.CLOUDINARY_API_SECRET,
});

export const uploadOne = async (file: Buffer | string, folder_name: string) => {
  try {
    let response;
    if (Buffer.isBuffer(file)) {
      response = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: folder_name },
          (err, result) => {
            if (err || !result)
              return reject(err || new AppError("Upload failed"));
            resolve(result);
          },
        );
        stream.end(file);
      });
    } else {
      response = await cloudinary.uploader.upload(file, {
        folder: folder_name,
      });
    }

    return { image_url: response.secure_url, public_id: response.public_id };
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    throw new AppError("Image upload failed");
  }
};

export const deleteOne = async (public_id: string) => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw new AppError("Image delete failed");
  }
};
