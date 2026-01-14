import { body, param } from "express-validator";
import { Types } from "mongoose";
import { validation, validationMessage } from "./schemaValidation";

export const deactiveValidator = body("password")
  .trim()
  .notEmpty()
  .withMessage(validationMessage.PASSWORD_REQUIRED_MESSAGE)
  .isLength({ min: validation.PASSWORD_MIN_LENGTH })
  .withMessage(validationMessage.PASSWORD_MIN_LENGTH_MESSAGE)
  .matches(validation.PASSWORD_REGEX)
  .withMessage(validationMessage.PASSWORD_REGEX_MESSAGE);

export const userIDValidator = [
  param("id").custom((value) => {
    if (!Types.ObjectId.isValid(value)) {
      throw new Error("Invalid user ID");
    }
    return true;
  }),
];
