import crypto, { randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { ENV_VARS } from "../config/envVars";

export const generateJwtTokens = (userId: Types.ObjectId) => {
  const accessToken = jwt.sign({ userId }, ENV_VARS.ACCESS_JWT_SECRET!, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, ENV_VARS.REFRESH_JWT_SECRET!, {
    expiresIn: "30d",
  });

  return { accessToken, refreshToken };
};

export const generateToken = () => {
  return randomBytes(32).toString("hex");
};

export const generateSecureCode = (digits = 6) => {
  const max = 10 ** digits;
  // crypto.randomInt generates cryptographically secure integer
  const code = crypto.randomInt(0, max);
  return code.toString().padStart(digits, "0"); // always 6 digits
};
