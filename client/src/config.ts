export const validation = {
  USERNAME_MIN_LENGTH: 5,
  USERNAME_MAX_LENGTH: 30,
  PASSWORD_MIN_LENGTH: 6,
  PASSWOED_REGEX: /^[a-zA-Z0-9]+$/,
};

export const validationMessage = {
  USERNAME_MIN_LENGTH_MESSAGE: `Name must be at least ${validation.USERNAME_MIN_LENGTH} characters`,
  USERNAME_MAX_LENGTH_MESSAGE: `Name must not be more than  ${validation.USERNAME_MAX_LENGTH} characters`,
  EMAIL_MESSAGE: "Please enter a valid email",
  PASSWORD_MIN_LENGTH_MESSAGE: `Password must be at least ${validation.PASSWORD_MIN_LENGTH} characters`,
  PASSWORD_REGEX_MESSAGE: "Password can only contain letters and numbers",
};
