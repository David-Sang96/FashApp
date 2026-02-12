import { validation, validationMessage } from "@/config";
import { z } from "zod";

const hexColorRegex = /^#([0-9A-Fa-f]{6})$/; // hex code must be exactly six digits
const priceRegex = validation.PRICE_REGEX;

export const createProductSchema = z.object({
  name: z
    .string()
    .min(
      validation.PRODUCTNAME_MIN_LENGTH,
      validationMessage.PRODUCTNAME_MIN_LENGTH_MESSAGE,
    ),

  description: z
    .string()
    .min(
      validation.DESCRIPTION_MIN_LENGTH,
      validationMessage.DESCRIPTION_MIN_LENGTH_MESSAGE,
    ),

  price: z
    .string()
    .min(1, validationMessage.PRICE_REQUIRED_MESSAGE)
    .regex(priceRegex, validationMessage.PRICE_FORMAT_MESSAGE)
    .refine(
      (val) => Number(val) >= validation.PRICE_MIN,
      validationMessage.PRICE_MIN_MESSAGE,
    ),

  instock_count: z
    .number()
    .int()
    .min(validation.STOCK_COUNT_MIN, validationMessage.STOCK_COUNT_MIN_MESSAGE),

  category: z
    .string()
    .min(
      validation.CATEGORY_MIN_lENGTH,
      validationMessage.CATEGORY_MIN_lENGTH_MESSAGE,
    ),

  sizes: z.array(z.string()).min(1, validationMessage.SIZES_MESSAGE),

  colors: z
    .array(
      z.object({
        name: z.string().min(1, "Color name is required"),
        hex: z
          .string()
          .regex(hexColorRegex, "Color hex must be a valid hex code"),
      }),
    )
    .min(1, validationMessage.COLORS_MESSAGE),

  is_newArrival: z.boolean(),

  is_feature: z.boolean(),

  rating_count: z
    .number()
    .int()
    .min(validation.RATING_COUNT_MIN, validationMessage.RATING_MIN_MESSAGE),
});

export const updateProductSchema = createProductSchema.partial();
