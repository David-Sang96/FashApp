import { Response } from "express";
import { ENV_VARS } from "../config/envVars";

const isProd = ENV_VARS.NODE_ENV === "production";

export const setTokensCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProd, // true in prod, false in dev
      maxAge: 15 * 60 * 1000,
      sameSite: isProd ? "none" : "lax", // "lax" works in localhost dev
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: isProd ? "none" : "lax",
    });
};
