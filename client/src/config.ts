export const validation = {
  USERNAME_MIN_LENGTH: 5,
  USERNAME_MAX_LENGTH: 30,
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_REGEX: /^[a-zA-Z0-9]+$/,
};

export const validationMessage = {
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
};
