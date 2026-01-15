import { validation, validationMessage } from "@/config";
import { z } from "zod";

export const registerSchema = z.object({
  name: z
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
    .regex(validation.PASSWORD_REGEX, validationMessage.PASSWORD_REGEX_MESSAGE),
});

export const loginSchema = z.object({
  email: z.email(validationMessage.EMAIL_MESSAGE),
  password: z
    .string()
    .min(
      validation.PASSWORD_MIN_LENGTH,
      validationMessage.PASSWORD_MIN_LENGTH_MESSAGE,
    )
    .regex(validation.PASSWORD_REGEX, validationMessage.PASSWORD_REGEX_MESSAGE),
});

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(
        validation.PASSWORD_MIN_LENGTH,
        validationMessage.CURRENT_PASSWORD_MIN_LENGTH_MESSAGE,
      )
      .regex(
        validation.PASSWORD_REGEX,
        validationMessage.CURRENT_PASSWORD_REGEX_MESSAGE,
      ),
    newPassword: z
      .string()
      .min(
        validation.PASSWORD_MIN_LENGTH,
        validationMessage.NEW_PASSWORD_MIN_LENGTH_MESSAGE,
      )
      .regex(
        validation.PASSWORD_REGEX,
        validationMessage.NEW_PASSWORD_REGEX_MESSAGE,
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const updateUserInfoSchema = z.object({
  name: z
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
});

export const acccountDeactivateSchema = z.object({
  password: z
    .string()
    .min(
      validation.PASSWORD_MIN_LENGTH,
      validationMessage.PASSWORD_MIN_LENGTH_MESSAGE,
    )
    .regex(validation.PASSWORD_REGEX, validationMessage.PASSWORD_REGEX_MESSAGE),
});
