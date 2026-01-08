import { Response } from "express";
import { ENV_VARS } from "../config/envVars";

export const setTokensCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: ENV_VARS.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
      sameSite: "none",
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: ENV_VARS.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "none",
    });
};
