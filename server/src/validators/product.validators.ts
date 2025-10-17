import { body, param } from "express-validator";
import { Types } from "mongoose";
import { validation, validationMessage } from "./schemaValidation";

export const createProductValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage(validationMessage.PRODUCTNAME_MIN_LENGTH_MESSAGE)
    .isLength({ min: validation.PRODUCTNAME_MIN_LENGTH })
    .withMessage(validationMessage.PRODUCTNAME_MIN_LENGTH_MESSAGE),

  body("description")
    .trim()
    .notEmpty()
    .withMessage(validationMessage.DESCRIPTION_MIN_LENGTH_MESSAGE)
    .isLength({ min: validation.DESCRIPTION_MIN_LENGTH })
    .withMessage(validationMessage.DESCRIPTION_MIN_LENGTH_MESSAGE),

  body("price")
    .notEmpty()
    .withMessage(validationMessage.PRICE_REQUIRED_MESSAGE)
    .isFloat({ gt: validation.PRICE_MIN - 1 }) // gt: 0
    .withMessage(validationMessage.PRICE_MIN_MESSAGE)
    .custom((value) => validation.PRICE_REGEX.test(value.toString()))
    .withMessage(validationMessage.PRICE_FORMAT_MESSAGE),

  body("instock_count")
    .notEmpty()
    .withMessage(validationMessage.STOCK_COUNT_REQUIRED_MESSAGE)
    .isInt({ min: validation.STOCK_COUNT_MIN })
    .withMessage(validationMessage.STOCK_COUNT_MIN_MESSAGE),

  body("category")
    .trim()
    .notEmpty()
    .withMessage(validationMessage.CATEGORY_MIN_lENGTH_MESSAGE)
    .isLength({ min: validation.CATEGORY_MIN_lENGTH })
    .withMessage(validationMessage.CATEGORY_MIN_lENGTH_MESSAGE),

  // sizes must be an array of strings with at least one item
  body("sizes")
    .isArray({ min: 1 })
    .withMessage(validationMessage.SIZES_MESSAGE)
    .bail()
    .custom((arr) => arr.every((item: any) => typeof item === "string"))
    .withMessage("Each size must be a string"),

  // colors must be an array of strings with at least one item
  body("colors")
    .isArray({ min: 1 })
    .withMessage(validationMessage.COLORS_MESSAGE)
    .bail()
    .custom((arr) => arr.every((item: any) => typeof item === "string"))
    .withMessage("Each color must be a string"),

  body("images")
    .isArray({ min: 1 })
    .withMessage(validationMessage.IMAGES_MESSAGE),

  body("images.*.url")
    .exists({ checkFalsy: true }) // ensures the field exists and is not empty
    .withMessage("Each image must have a URL")
    .isString()
    .withMessage("Image URL must be a string")
    .isURL()
    .withMessage("Image URL must be a valid URL"),

  body("images.*.public_alt")
    .exists({ checkFalsy: true })
    .withMessage("Each image must have public_alt")
    .isString()
    .withMessage("public_alt must be a string "),

  body("is_newArrival")
    .notEmpty()
    .withMessage(validationMessage.NEWARRIVAL_REQUIRED_MESSAGE)
    .isBoolean()
    .withMessage(validationMessage.NEWARRIVAL_REQUIRED_MESSAGE),

  body("is_feature")
    .notEmpty()
    .withMessage(validationMessage.FEATURE_REQUIRED_MESSAGE)
    .isBoolean()
    .withMessage(validationMessage.FEATURE_REQUIRED_MESSAGE),

  body("rating_count")
    .notEmpty()
    .withMessage(validationMessage.RATING_REQUIRED_MESSAGE)
    .isInt({ min: validation.RATING_COUNT_MIN })
    .withMessage(validationMessage.RATING_MIN_MESSAGE),
];

export const updateProductValidator = [
  param("id").custom((value) => {
    if (!Types.ObjectId.isValid(value)) {
      throw new Error("Invalid product ID");
    }
    return true;
  }),

  body("name")
    .optional()
    .trim()
    .isLength({ min: validation.PRODUCTNAME_MIN_LENGTH })
    .withMessage(validationMessage.PRODUCTNAME_MIN_LENGTH_MESSAGE),

  body("description")
    .optional()
    .trim()
    .isLength({ min: validation.DESCRIPTION_MIN_LENGTH })
    .withMessage(validationMessage.DESCRIPTION_MIN_LENGTH_MESSAGE),

  body("price")
    .optional()
    .isFloat({ gt: validation.PRICE_MIN - 1 })
    .withMessage(validationMessage.PRICE_MIN_MESSAGE)
    .custom((value) => validation.PRICE_REGEX.test(value.toString()))
    .withMessage(validationMessage.PRICE_FORMAT_MESSAGE),

  body("instock_count")
    .optional()
    .isInt({ min: validation.STOCK_COUNT_MIN })
    .withMessage(validationMessage.STOCK_COUNT_MIN_MESSAGE),

  body("category")
    .optional()
    .trim()
    .isLength({ min: validation.CATEGORY_MIN_lENGTH })
    .withMessage(validationMessage.CATEGORY_MIN_lENGTH_MESSAGE),

  body("sizes")
    .optional()
    .isArray({ min: 1 })
    .withMessage(validationMessage.SIZES_MESSAGE)
    .bail()
    .custom((arr) => arr.every((item: any) => typeof item === "string"))
    .withMessage("Each size must be a string"),

  body("colors")
    .optional()
    .isArray({ min: 1 })
    .withMessage(validationMessage.COLORS_MESSAGE)
    .bail()
    .custom((arr) => arr.every((item: any) => typeof item === "string"))
    .withMessage("Each color must be a string"),

  body("images")
    .optional()
    .isArray({ min: 1 })
    .withMessage(validationMessage.IMAGES_MESSAGE),

  body("images.*.url")
    .optional()
    .exists({ checkFalsy: true })
    .withMessage("Each image must have a URL")
    .isString()
    .withMessage("Image URL must be a string")
    .isURL()
    .withMessage("Image URL must be a valid URL"),

  body("images.*.public_alt")
    .optional()
    .exists({ checkFalsy: true })
    .withMessage("Each image must have public_alt")
    .isString()
    .withMessage("public_alt must be a string "),

  body("is_newArrival")
    .optional()
    .isBoolean()
    .withMessage(validationMessage.NEWARRIVAL_REQUIRED_MESSAGE),

  body("is_feature")
    .optional()
    .isBoolean()
    .withMessage(validationMessage.FEATURE_REQUIRED_MESSAGE),

  body("rating_count")
    .optional()
    .isInt({ min: validation.RATING_COUNT_MIN })
    .withMessage(validationMessage.RATING_MIN_MESSAGE),
];

export const deleteProductValidator = [
  param("id").custom((value) => {
    if (!Types.ObjectId.isValid(value)) {
      throw new Error("Invalid product ID");
    }
    return true;
  }),
];
