import { body, param } from "express-validator";
import { validation, validationMessage } from "./schemaValidation";

export const userIDValidator = [
  // param("id").custom((value) => {
  //   if (!Types.ObjectId.isValid(value)) {
  //     throw new Error("Invalid user ID");
  //   }
  //   return true;
  // }),
  param("id").isMongoId().withMessage("Invalid product ID"),
];

export const updateUserValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage(validationMessage.USERNAME_REQUIRED_MESSAGE)
    .isLength({ min: validation.USERNAME_MIN_LENGTH })
    .withMessage(validationMessage.USERNAME_MIN_LENGTH_MESSAGE)
    .isLength({ max: validation.USERNAME_MAX_LENGTH })
    .withMessage(validationMessage.USERNAME_MAX_LENGTH_MESSAGE),
];
