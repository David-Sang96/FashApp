export const validation = {
  // Authentication
  USERNAME_MIN_LENGTH: 5,
  USERNAME_MAX_LENGTH: 30,
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_REGEX: /^[a-zA-Z0-9]+$/,

  // Product
  PRODUCTNAME_MIN_LENGTH: 5,
  DESCRIPTION_MIN_LENGTH: 10,
  PRICE_MIN: 1,
  PRICE_REGEX: /^\d+(\.\d{1,2})?$/, // Allows integers and decimals up to 2 places
  STOCK_COUNT_MIN: 0, //
  CATEGORY_MIN_lENGTH: 3,
  RATING_COUNT_MIN: 0,
};

export const validationMessage = {
  // Authentication
  USERNAME_MIN_LENGTH_MESSAGE: `Name must be at least ${validation.USERNAME_MIN_LENGTH} characters`,
  USERNAME_MAX_LENGTH_MESSAGE: `Name must not be more than  ${validation.USERNAME_MAX_LENGTH} characters`,
  EMAIL_MESSAGE: "Please enter a valid email",
  PASSWORD_MIN_LENGTH_MESSAGE: `Password must be at least ${validation.PASSWORD_MIN_LENGTH} characters`,
  PASSWORD_REGEX_MESSAGE: "Password can only contain letters and numbers",
  CURRENT_PASSWORD_MIN_LENGTH_MESSAGE: `Current password must be at least ${validation.PASSWORD_MIN_LENGTH} characters`,
  CURRENT_PASSWORD_REGEX_MESSAGE:
    "Current password can only contain letters and numbers",
  NEW_PASSWORD_MIN_LENGTH_MESSAGE: `New password must be at least ${validation.PASSWORD_MIN_LENGTH} characters`,
  NEW_PASSWORD_REGEX_MESSAGE:
    "New password can only contain letters and numbers",
  ROLE_MESSAGE: "Role must be either 'user' or 'admin'",
  PROVIDER_MESSAGE: "Provider must be either 'local' or 'google'",

  // Product
  PRODUCTNAME_REQUIRED_MESSAGE: "Product name is required",
  PRODUCTNAME_MIN_LENGTH_MESSAGE: `Name must be at least ${validation.PRODUCTNAME_MIN_LENGTH} characters`,
  DESCRIPTION_REQUIRED_MESSAGE: "Product description is required",
  DESCRIPTION_MIN_LENGTH_MESSAGE: `Description must be at least ${validation.DESCRIPTION_MIN_LENGTH} characters`,
  CATEGORY_REQUIRED_MESSAGE: "Category is required",
  CATEGORY_MIN_lENGTH_MESSAGE: `At least ${validation.CATEGORY_MIN_lENGTH} characters`,
  PRICE_REQUIRED_MESSAGE: "Price is required",
  PRICE_MIN_MESSAGE: "Price must be at least $1",
  PRICE_FORMAT_MESSAGE:
    "Price must be a valid number with up to two decimal places",
  STOCK_COUNT_REQUIRED_MESSAGE: "Stock count is required",
  STOCK_COUNT_MIN_MESSAGE: "Stock count cannot be negative",
  RATING_REQUIRED_MESSAGE: "Rating is required",
  RATING_MIN_MESSAGE: "Rating must be at least 0",
  SIZES_MESSAGE: "At least one size must be provided",
  SIZES_REQUIRED_MESSAGE: "Sizes is required",
  COLORS_MESSAGE: "At least one color must be provided",
  COLORS_REQUIRED_MESSAGE: "Colors is required",
  IMAGES_MESSAGE: "Images must be an array with at least 1 object",
  IMAGES_REQUIRED_MESSAGE: "Images is required",
};
