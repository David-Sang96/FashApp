import { body } from "express-validator";
import { validation, validationMessage } from "./schemaValidation";

const emailValidator = body("email")
  .trim()
  .isEmail()
  .withMessage(validationMessage.EMAIL_REGEX_MESSAGE)
  .normalizeEmail(); // converts "User@Gmail.com" to "user@gmail.com"

const passwordValidator = body("password")
  .trim()
  .notEmpty()
  .withMessage(validationMessage.PASSWORD_REQUIRED_MESSAGE);

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
