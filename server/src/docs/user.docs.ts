export const userSwaggerDocs = {
  "/users": {
    get: {
      summary: "Get all users",
      tags: ["Users"],
      responses: {
        200: {
          description: "List of all users",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  users: {
                    type: "array",
                    items: { type: "object" },
                  },
                },
              },
            },
          },
        },
      },
      security: [{ cookieAuth: [] }],
    },
  },

  "/users/{id}": {
    get: {
      summary: "Get single user by ID",
      tags: ["Users"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "User ID",
        },
      ],
      responses: {
        200: {
          description: "User found",
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
        404: { description: "User not found" },
      },
      security: [{ cookieAuth: [] }],
    },
  },

  "/users/me": {
    put: {
      summary: "Update logged-in user's info",
      tags: ["Users"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name"],
              properties: { name: { type: "string", example: "David Sang" } },
            },
          },
        },
      },
      responses: {
        200: {
          description: "User updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: { type: "string", example: "Updated successfully" },
                  user: { type: "object" },
                },
              },
            },
          },
        },
        401: { description: "Unauthorized" },
      },
      security: [{ cookieAuth: [] }],
    },
  },
};
