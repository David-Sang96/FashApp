import { validation, validationMessage } from "@/config";
import { z } from "zod";

export const registerSchema = z.object({
  usename: z
    .string()
    .min(
      validation.USERNAME_MIN_LENGTH,
      validationMessage.USERNAME_MIN_LENGTH_MESSAGE,
    )
    .max(
      validation.USERNAME_MAX_LENGTH,
      validationMessage.USERNAME_MAX_LENGTH_MESSAGE,
    ),
  email: z.email(validationMessage.EMAIL_MESSAGE),
  password: z
    .string()
    .min(
      validation.PASSWORD_MIN_LENGTH,
      validationMessage.PASSWORD_MIN_LENGTH_MESSAGE,
    )
    .regex(validation.PASSWOED_REGEX, validationMessage.PASSWORD_REGEX_MESSAGE),
});

export const loginSchema = z.object({
  email: z.email(validationMessage.EMAIL_MESSAGE),
  password: z
    .string()
    .min(
      validation.PASSWORD_MIN_LENGTH,
      validationMessage.PASSWORD_MIN_LENGTH_MESSAGE,
    )
    .regex(validation.PASSWOED_REGEX, validationMessage.PASSWORD_REGEX_MESSAGE),
});
