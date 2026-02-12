import { body, checkSchema, param } from "express-validator";
import { validation, validationMessage } from "./schemaValidation";

/* 
 Why checkSchema instead of many body() calls

Your original validator:
Was long
Had a lot of duplication
Could validate, but not convert types

With FormData:
Everything arrives as string
Validators like .isArray() will fail unless we convert first

checkSchema lets us do both in one place:
sanitize → then validate
That’s the key upgrade.

Mental model to keep forever:
FormData → strings
Sanitizer → real types
Validator → correctness
Controller → logic
Schema → persistence
*/

const parseArray = (value: any) => {
  /* 
  Client sends	          Result
  sizes=L&sizes=XL	    ["L","XL"]
  sizes=["L","XL"]	    ["L","XL"]
  sizes=L                 ["L"]
  */
  if (Array.isArray(value)) return value;
  try {
    return JSON.parse(value);
  } catch {
    return [value];
  }
};

const parseColors = (value: any) => {
  /* 
  Purpose: convert JSON strings into real objects:
      '{"name":"White","hex":"#FFF"}'
      →
      { name: "White", hex: "#FFF" }
  */
  if (Array.isArray(value)) {
    return value.map((c) => JSON.parse(c));
  }
  return JSON.parse(value);
};

// FormData turns: true → "true"
const parseBoolean = (value: any) => value === true || value === "true";

const productSchema = (isCreate: boolean) =>
  checkSchema({
    name: {
      optional: !isCreate,
      trim: true,
      notEmpty: {
        errorMessage: validationMessage.PRODUCTNAME_REQUIRED_MESSAGE,
      },
      isLength: {
        options: { min: validation.PRODUCTNAME_MIN_LENGTH },
        errorMessage: validationMessage.PRODUCTNAME_MIN_LENGTH_MESSAGE,
      },
    },

    description: {
      optional: !isCreate,
      trim: true,
      notEmpty: {
        errorMessage: validationMessage.DESCRIPTION_REQUIRED_MESSAGE,
      },
      isLength: {
        options: { min: validation.DESCRIPTION_MIN_LENGTH },
        errorMessage: validationMessage.DESCRIPTION_MIN_LENGTH_MESSAGE,
      },
    },

    price: {
      optional: !isCreate,
      isFloat: {
        options: { gt: validation.PRICE_MIN - 1 },
        errorMessage: validationMessage.PRICE_MIN_MESSAGE,
      },
      custom: {
        options: (v) => validation.PRICE_REGEX.test(v.toString()),
        errorMessage: validationMessage.PRICE_FORMAT_MESSAGE,
      },
    },

    instock_count: {
      optional: !isCreate,
      isInt: {
        options: { min: validation.STOCK_COUNT_MIN },
        errorMessage: validationMessage.STOCK_COUNT_MIN_MESSAGE,
      },
      toInt: true,
    },

    category: {
      optional: !isCreate,
      trim: true,
      notEmpty: {
        errorMessage: validationMessage.CATEGORY_REQUIRED_MESSAGE,
      },
      isLength: {
        options: { min: validation.CATEGORY_MIN_lENGTH },
        errorMessage: validationMessage.CATEGORY_MIN_lENGTH_MESSAGE,
      },
    },

    // sizes
    sizes: {
      optional: !isCreate,
      customSanitizer: {
        options: parseArray,
      },
      isArray: {
        options: { min: 1 },
        errorMessage: validationMessage.SIZES_MESSAGE,
      },
      custom: {
        options: (arr) => arr.every((s: any) => typeof s === "string"),
        errorMessage: "Each size must be a string",
      },
    },

    // colors
    colors: {
      optional: !isCreate,
      customSanitizer: {
        options: parseColors,
      },
      isArray: {
        options: { min: 1 },
        errorMessage: validationMessage.COLORS_MESSAGE,
      },
    },

    "colors.*.name": {
      optional: !isCreate,
      isString: {
        errorMessage: "Color name is required",
      },
    },

    "colors.*.hex": {
      optional: !isCreate,
      matches: {
        options: /^#([0-9A-Fa-f]{6})$/,
        errorMessage: "Invalid hex color",
      },
    },

    is_newArrival: {
      optional: !isCreate,
      customSanitizer: {
        options: parseBoolean,
      },
      isBoolean: {
        errorMessage: validationMessage.NEWARRIVAL_REQUIRED_MESSAGE,
      },
    },

    is_feature: {
      optional: !isCreate,
      customSanitizer: {
        options: parseBoolean,
      },
      isBoolean: {
        errorMessage: validationMessage.FEATURE_REQUIRED_MESSAGE,
      },
    },

    rating_count: {
      optional: !isCreate,
      isInt: {
        options: { min: validation.RATING_COUNT_MIN },
        errorMessage: validationMessage.RATING_MIN_MESSAGE,
      },
      toInt: true,
    },
  });

export const createProductValidator = productSchema(true);
export const updateProductValidator = productSchema(false);

export const productIDValidator = [
  param("id").isMongoId().withMessage("Invalid product ID"),
  // param("id").custom((value) => {
  //   if (!Types.ObjectId.isValid(value)) {
  //     throw new Error("Invalid product ID");
  //   }
  //   return true;
  // }),
];

export const productUploadImageValidator = [
  body("images").custom((_value, { req }) => {
    if (!req.files || !Array.isArray(req.files)) {
      throw new Error("At least one image is required");
    }
    if (req.files.length > 6) {
      throw new Error("Maximum 6 images allowed");
    }
    return true;
  }),
];
