export const authSwaggerDocs = {
  "/auth/upload": {
    post: {
      summary: "Upload or update user avatar",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              required: ["avatar"],
              properties: {
                avatar: {
                  type: "string",
                  format: "binary",
                  description: "Image file to upload as avatar",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Avatar uploaded successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Avatar uploaded successfully",
                  },
                  avatarUrl: {
                    type: "string",
                    example: "https://yourcdn.com/avatar123.png",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Invalid file or validation error",
        },
        401: {
          description: "Unauthorized — user not logged in",
        },
      },
      security: [{ cookieAuth: [] }], // protected route
    },
  },

  "/auth/register": {
    post: {
      summary: "Register new user",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "email", "password"],
              properties: {
                name: { type: "string", example: "David" },
                email: { type: "string", example: "test@mail.com" },
                password: { type: "string", example: "123456" },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Registration successful" },
      },
    },
  },

  "/auth/login": {
    post: {
      summary: "Login user",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: { type: "string", example: "test@mail.com" },
                password: { type: "string", example: "123456" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Login successful" },
      },
    },
  },

  "/auth/google": {
    get: {
      summary: "Redirect to Google OAuth for login",
      tags: ["Auth"],
      responses: {
        302: { description: "Redirects user to Google login page" },
      },
    },
  },

  "/auth/google/callback": {
    get: {
      summary: "Google OAuth callback endpoint",
      tags: ["Auth"],
      parameters: [
        {
          in: "query",
          name: "code",
          required: true,
          schema: { type: "string" },
          description: "Authorization code returned by Google",
        },
        {
          in: "query",
          name: "state",
          required: false,
          schema: { type: "string" },
          description: "Optional state parameter",
        },
      ],
      responses: {
        200: { description: "Login successful and tokens issued" },
        400: { description: "Invalid Google OAuth code" },
      },
    },
  },

  "/auth/logout": {
    post: {
      summary: "Logout user",
      tags: ["Auth"],
      responses: { 200: { description: "Logout successful" } },
      security: [{ cookieAuth: [] }],
    },
  },

  "/auth/refresh": {
    post: {
      summary: "Rotate access & refresh tokens",
      tags: ["Auth"],
      responses: {
        200: { description: "Tokens rotated successfully" },
        401: { description: "Invalid or expired refresh token" },
      },
      security: [{ cookieAuth: [] }],
    },
  },

  "/auth/me": {
    get: {
      summary: "Get current logged-in user",
      tags: ["Auth"],
      responses: {
        200: { description: "Returns user info" },
        401: { description: "User not authenticated" },
      },
      security: [{ cookieAuth: [] }],
    },
    delete: {
      summary: "Deactivate user account",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["password"],
              properties: {
                password: { type: "string", example: "userpassword123" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Account deactivated" },
        401: { description: "Unauthorized / invalid password" },
      },
      security: [{ cookieAuth: [] }],
    },
  },

  "/auth/verify-email": {
    get: {
      summary: "Verify user email using token",
      tags: ["Auth"],
      parameters: [
        {
          in: "query",
          name: "token",
          required: true,
          schema: { type: "string" },
          description: "Email verification token",
        },
      ],
      responses: {
        200: { description: "Email verified and logged in" },
        400: { description: "Invalid or expired token" },
      },
    },
  },

  "/auth/forget-password": {
    post: {
      summary: "Send email to reset password",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email"],
              properties: {
                email: { type: "string", example: "test@mail.com" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Reset password email sent" },
      },
    },
  },

  "/auth/reset-password": {
    post: {
      summary: "Reset the user's password using token",
      tags: ["Auth"],
      parameters: [
        {
          in: "query",
          name: "token",
          required: true,
          schema: { type: "string" },
          description: "Reset password token sent via email",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["newPassword"],
              properties: {
                newPassword: { type: "string", example: "newpass123" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Password reset successful" },
        400: { description: "Invalid or expired token" },
      },
    },
  },

  "/auth/verify-reset-token": {
    get: {
      summary: "Verify if reset password token is valid",
      tags: ["Auth"],
      parameters: [
        {
          in: "query",
          name: "token",
          required: true,
          schema: { type: "string" },
          description: "Reset password token",
        },
      ],
      responses: {
        200: {
          description: "Token is valid",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: { type: "string", example: "Token is valid" },
                  email: { type: "string", example: "test@mail.com" },
                },
              },
            },
          },
        },
        400: { description: "Invalid or expired token" },
      },
    },
  },

  "/auth/resend": {
    post: {
      summary: "Resend verification or reset password email",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "type"],
              properties: {
                email: { type: "string", example: "test@mail.com" },
                type: {
                  type: "string",
                  enum: ["verify", "reset"],
                  example: "verify",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Email sent successfully",
        },
      },
    },
  },

  "/auth/change-password": {
    patch: {
      summary: "Change logged-in user's password",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["currentPassword", "newPassword"],
              properties: {
                currentPassword: { type: "string", example: "oldpass123" },
                newPassword: { type: "string", example: "newpass456" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Password updated successfully" },
        401: { description: "Unauthorized / invalid current password" },
      },
      security: [{ cookieAuth: [] }],
    },
  },
};
