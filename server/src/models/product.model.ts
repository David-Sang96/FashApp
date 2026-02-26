import mongoose, { model, Schema } from "mongoose";
import { IProduct } from "../types/productType";
import { validation, validationMessage } from "../validators/schemaValidation";

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      minlength: [
        validation.PRODUCTNAME_MIN_LENGTH,
        validationMessage.PRODUCTNAME_MIN_LENGTH_MESSAGE,
      ],
    },

    description: {
      type: String,
      required: true,
      minlength: [
        validation.DESCRIPTION_MIN_LENGTH,
        validationMessage.DESCRIPTION_MIN_LENGTH_MESSAGE,
      ],
    },

    price: {
      type: Number,
      required: [true, validationMessage.PRICE_REQUIRED_MESSAGE],
      min: [validation.PRICE_MIN, validationMessage.PRICE_MIN_MESSAGE],
      validate: {
        validator: function (value: number) {
          return validation.PRICE_REGEX.test(value.toString());
        },
        message: validationMessage.PRICE_FORMAT_MESSAGE,
      },
    },

    instock_count: {
      type: Number,
      required: [true, validationMessage.STOCK_COUNT_REQUIRED_MESSAGE],
      min: [
        validation.STOCK_COUNT_MIN,
        validationMessage.STOCK_COUNT_MIN_MESSAGE,
      ],
    },

    category: {
      type: String,
      required: true,
      minLength: [
        validation.CATEGORY_MIN_lENGTH,
        validationMessage.CATEGORY_MIN_lENGTH_MESSAGE,
      ],
    },

    sizes: {
      type: [String],
      required: [true, validationMessage.SIZES_REQUIRED_MESSAGE],
      validate: {
        validator: (val: string[]) => Array.isArray(val) && val.length > 0,
        message: validationMessage.SIZES_MESSAGE,
      },
    },

    colors: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          hex: {
            type: String,
            required: true,
            match: [/^#([0-9A-Fa-f]{6})$/, "Invalid hex color"],
          },
        },
      ],
      required: [true, validationMessage.COLORS_REQUIRED_MESSAGE],
      validate: {
        validator: (val: any[]) => Array.isArray(val) && val.length > 0,
        message: validationMessage.COLORS_MESSAGE,
      },
    },

    images: {
      type: [
        {
          image_url: {
            type: String,
            required: true,
            match: [/^https?:\/\/.+/, "image_url must be a valid URL"],
          },
          public_id: { type: String, required: true },
        },
      ],
      required: [true, validationMessage.IMAGES_REQUIRED_MESSAGE],
      validate: {
        validator: (val: any[]) => Array.isArray(val) && val.length > 0,
        message: validationMessage.IMAGES_MESSAGE,
      },
    },

    is_newArrival: {
      type: Boolean,
      required: [true, validationMessage.NEWARRIVAL_REQUIRED_MESSAGE],
    },

    is_feature: {
      type: Boolean,
      required: [true, validationMessage.FEATURE_REQUIRED_MESSAGE],
    },

    rating_count: {
      type: Number,
      required: [true, validationMessage.RATING_REQUIRED_MESSAGE],
      min: [validation.RATING_COUNT_MIN, validationMessage.RATING_MIN_MESSAGE],
      max: [validation.RATING_COUNT_MAX, validationMessage.RATING_MAX_MESSAGE],
      default: validation.RATING_COUNT_MIN,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true },
);

export const Product = model<IProduct>("Product", productSchema);
