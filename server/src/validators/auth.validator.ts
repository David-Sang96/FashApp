import { body, query } from "express-validator";
import { AppError } from "../utils/AppError";
import { validation, validationMessage } from "./schemaValidation";

export const emailValidator = body("email")
  .trim()
  .isEmail()
  .withMessage(validationMessage.EMAIL_REGEX_MESSAGE)
  .normalizeEmail(); // converts "User@Gmail.com" to "user@gmail.com"

export const passwordValidator = body("password")
  .trim()
  .notEmpty()
  .withMessage(validationMessage.PASSWORD_REQUIRED_MESSAGE);

export const tokenValidator = query("token")
  .notEmpty()
  .withMessage("Token is required")
  .isLength({ min: 32 })
  .withMessage("Invalid token format");

export const registerUserValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage(validationMessage.USERNAME_REQUIRED_MESSAGE)
    .isLength({ min: validation.USERNAME_MIN_LENGTH })
    .withMessage(validationMessage.USERNAME_MIN_LENGTH_MESSAGE)
    .isLength({ max: validation.USERNAME_MAX_LENGTH })
    .withMessage(validationMessage.USERNAME_MAX_LENGTH_MESSAGE),
  emailValidator,
  passwordValidator
    .isLength({ min: validation.PASSWORD_MIN_LENGTH })
    .withMessage(validationMessage.PASSWORD_MIN_LENGTH_MESSAGE)
    .matches(validation.PASSWORD_REGEX)
    .withMessage(validationMessage.PASSWORD_REGEX_MESSAGE),
];

export const loginUserValidator = [emailValidator, passwordValidator];

export const changePasswordValidator = [
  body("currentPassword")
    .trim()
    .notEmpty()
    .withMessage(validationMessage.PASSWORD_REQUIRED_MESSAGE),

  body("newPassword")
    .trim()
    .notEmpty()
    .withMessage(validationMessage.NEW_PASSWORD_REQUIRED_MESSAGE)
    .isLength({ min: validation.PASSWORD_MIN_LENGTH })
    .withMessage(validationMessage.NEW_PASSWORD_MIN_LENGTH_MESSAGE)
    .matches(validation.PASSWORD_REGEX)
    .withMessage(validationMessage.NEW_PASSWORD_REGEX_MESSAGE)
    .custom((value, { req }) => {
      if (value === req.body.currentPassword) {
        throw new Error("New password must be different from current password");
      }
      return true;
    }),
];

export const deactiveValidator = passwordValidator
  .isLength({ min: validation.PASSWORD_MIN_LENGTH })
  .withMessage(validationMessage.PASSWORD_MIN_LENGTH_MESSAGE)
  .matches(validation.PASSWORD_REGEX)
  .withMessage(validationMessage.PASSWORD_REGEX_MESSAGE);

export const resetPasswordValidator = [
  tokenValidator,
  body("newPassword")
    .trim()
    .notEmpty()
    .withMessage(validationMessage.PASSWORD_REQUIRED_MESSAGE)
    .isLength({ min: validation.PASSWORD_MIN_LENGTH })
    .withMessage(validationMessage.PASSWORD_MIN_LENGTH_MESSAGE)
    .matches(validation.PASSWORD_REGEX)
    .withMessage(validationMessage.PASSWORD_REGEX_MESSAGE),
];

export const resendEmailValidator = [
  emailValidator,
  body("type")
    .isString()
    .withMessage("Type must be a string")
    .isIn(["verify", "reset"])
    .withMessage("Type must be either 'verify' or 'reset'"),
];

export const uploadImageValidator = [
  body("avatar").custom((_, { req }) => {
    if (!req.file) throw new AppError("Avatar is required", 400);
    return true;
  }),
];
