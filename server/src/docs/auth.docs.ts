export const authSwaggerDocs = {
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
        200: {
          description: "Returns user info",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  user: { type: "object" },
                },
              },
            },
          },
        },
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
