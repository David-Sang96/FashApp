import { Resend } from "resend";
import { ENV_VARS } from "./envVars";

export const resend = new Resend(ENV_VARS.RESEND_API_KEY);
