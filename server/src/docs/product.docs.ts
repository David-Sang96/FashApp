export const productSwaggerDocs = {
  "/products": {
    get: {
      summary: "Get all products (with filters & pagination)",
      tags: ["Products"],
      parameters: [
        { in: "query", name: "search", schema: { type: "string" } },
        { in: "query", name: "category", schema: { type: "string" } },
        {
          in: "query",
          name: "colors",
          schema: { type: "string" },
          description: "comma separated (red,blue)",
        },
        {
          in: "query",
          name: "sizes",
          schema: { type: "string" },
          description: "comma separated (S,M,L)",
        },
        { in: "query", name: "priceMin", schema: { type: "number" } },
        { in: "query", name: "priceMax", schema: { type: "number" } },
        { in: "query", name: "is_newArrival", schema: { type: "boolean" } },
        { in: "query", name: "is_feature", schema: { type: "boolean" } },
        {
          in: "query",
          name: "sort",
          schema: {
            type: "string",
            example: "price_asc | price_desc | latest",
          },
        },
        { in: "query", name: "page", schema: { type: "number", example: 1 } },
        { in: "query", name: "limit", schema: { type: "number", example: 12 } },
      ],
      responses: {
        200: {
          description: "Products fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  result: {
                    type: "object",
                    properties: {
                      products: { type: "array", items: { type: "object" } },
                      total: { type: "number" },
                      count: { type: "number" },
                      previousPage: { type: "number", nullable: true },
                      nextPage: { type: "number", nullable: true },
                      currentPage: { type: "number" },
                      totalPages: { type: "number" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      security: [{ cookieAuth: [] }],
    },

    post: {
      summary: "Create new product (Admin)",
      tags: ["Products"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "price", "category"],
              properties: {
                name: { type: "string", example: "Nike Shoes" },
                price: { type: "number", example: 120 },
                category: { type: "string", example: "Shoes" },
                colors: { type: "array", items: { type: "string" } },
                sizes: { type: "array", items: { type: "string" } },
                is_newArrival: { type: "boolean" },
                is_feature: { type: "boolean" },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Product created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  product: { type: "object" },
                },
              },
            },
          },
        },
      },
      security: [{ cookieAuth: [] }],
    },
  },

  "/products/{id}": {
    get: {
      summary: "Get product by ID",
      tags: ["Products"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Product found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  product: { type: "object" },
                },
              },
            },
          },
        },
        404: { description: "Product not found" },
      },
      security: [{ cookieAuth: [] }],
    },

    put: {
      summary: "Update product (Admin)",
      tags: ["Products"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                price: { type: "number" },
                category: { type: "string" },
                colors: { type: "array", items: { type: "string" } },
                sizes: { type: "array", items: { type: "string" } },
                is_newArrival: { type: "boolean" },
                is_feature: { type: "boolean" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Product updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  product: { type: "object" },
                },
              },
            },
          },
        },
      },
      security: [{ cookieAuth: [] }],
    },

    delete: {
      summary: "Delete product (Admin)",
      tags: ["Products"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Product deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                },
              },
            },
          },
        },
      },
      security: [{ cookieAuth: [] }],
    },
  },

  "/products/new-arrival": {
    get: {
      summary: "Get new arrival products",
      tags: ["Products"],
      responses: {
        200: {
          description: "New arrival products",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  product: { type: "array", items: { type: "object" } },
                },
              },
            },
          },
        },
      },
      security: [{ cookieAuth: [] }],
    },
  },

  "/products/feature": {
    get: {
      summary: "Get featured products",
      tags: ["Products"],
      responses: {
        200: {
          description: "Featured products",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  product: { type: "array", items: { type: "object" } },
                },
              },
            },
          },
        },
      },
      security: [{ cookieAuth: [] }],
    },
  },
};
