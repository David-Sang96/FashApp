export const productSwaggerDocs = {
  "/products": {
    get: {
      summary: "Get all products (filters + page pagination)",
      tags: ["Products"],
      parameters: [
        { in: "query", name: "search", schema: { type: "string" } },
        {
          in: "query",
          name: "category",
          schema: { type: "string" },
          description: "Comma separated values (Shoes,Clothes)",
        },
        {
          in: "query",
          name: "colors",
          schema: { type: "string" },
          description: "Comma separated values (red,blue)",
        },
        {
          in: "query",
          name: "sizes",
          schema: { type: "string" },
          description: "Comma separated values (S,M,L)",
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
            enum: [
              "price_asc",
              "price_desc",
              "newest",
              "new_arrivals",
              "featured",
            ],
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
                $ref: "#/components/schemas/PaginatedProductsResponse",
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  result: {
                    type: "object",
                    properties: {
                      products: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Product" },
                      },
                      total: { type: "number", example: 100 },
                      currentPage: { type: "number", example: 1 },
                      totalPages: { type: "number", example: 9 },
                      hasPreviousPage: { type: "boolean", example: false },
                      hasNextPage: { type: "boolean", example: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    post: {
      summary: "Create product (Admin)",
      tags: ["Products"],
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              required: ["name", "price", "category", "description"],
              properties: {
                name: { type: "string", example: "Nike Shoes" },
                description: { type: "string" },
                price: { type: "number", example: 120 },
                category: { type: "string", example: "Shoes" },
                colors: {
                  type: "array",
                  items: { type: "string" },
                },
                sizes: {
                  type: "array",
                  items: { type: "string" },
                },
                is_newArrival: { type: "boolean", example: true },
                is_feature: { type: "boolean", example: false },
                images: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Product created successfully",
        },
      },
    },
  },

  "/products/cursor": {
    get: {
      summary: "Get products using cursor pagination",
      tags: ["Products"],
      parameters: [
        { in: "query", name: "search", schema: { type: "string" } },
        { in: "query", name: "cursor", schema: { type: "string" } },
        { in: "query", name: "limit", schema: { type: "number", example: 12 } },
      ],
      responses: {
        200: {
          description: "Products fetched successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CursorProductsResponse",
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  result: {
                    type: "object",
                    properties: {
                      products: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Product" },
                      },
                      nextCursor: {
                        type: "string",
                        nullable: true,
                      },
                      hasMore: { type: "boolean", example: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  "/products/filters/meta": {
    get: {
      summary: "Get products filter metadata",
      tags: ["Products"],
      responses: {
        200: {
          description: "Metadata fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  colors: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string", example: "Red" },
                        hex: { type: "string", example: "#ff0000" },
                      },
                    },
                  },
                  sizes: {
                    type: "array",
                    items: { type: "string", example: "M" },
                  },
                  categories: {
                    type: "array",
                    items: { type: "string", example: "Shoes" },
                  },
                  totalProductOfEachCategory: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        category: { type: "string" },
                        total: { type: "number" },
                      },
                    },
                  },
                  minPrice: { type: "number", example: 10 },
                  maxPrice: { type: "number", example: 500 },
                },
              },
            },
          },
        },
      },
    },
  },

  "/products/admin/all": {
    get: {
      summary: "Get products by logged-in admin",
      tags: ["Products"],
      security: [{ cookieAuth: [] }],
      responses: {
        200: {
          description: "Admin products fetched successfully",
        },
        404: {
          description: "Not Found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
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
        },
        404: {
          description: "Not Found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },

    put: {
      summary: "Update product (Admin)",
      tags: ["Products"],
      security: [{ cookieAuth: [] }],
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
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                description: { type: "string" },
                price: { type: "number" },
                category: { type: "string" },
                colors: {
                  type: "array",
                  items: { type: "string" },
                },
                sizes: {
                  type: "array",
                  items: { type: "string" },
                },
                is_newArrival: { type: "boolean" },
                is_feature: { type: "boolean" },
                images: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Product updated successfully",
        },
        404: {
          description: "Not Found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },

    delete: {
      summary: "Delete product (Admin)",
      tags: ["Products"],
      security: [{ cookieAuth: [] }],
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
        },
        404: {
          description: "Not Found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  },

  "/products/{productId}/image/{publicId}": {
    delete: {
      summary: "Delete a specific product image (Admin)",
      tags: ["Products"],
      security: [{ cookieAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "productId",
          required: true,
          schema: { type: "string" },
        },
        {
          in: "path",
          name: "publicId",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Image deleted successfully",
        },
        404: {
          description: "Not Found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  },

  "/products/new-arrival": {
    get: {
      summary: "Get all new arrival products",
      tags: ["Products"],
      responses: {
        200: {
          description: "New arrival products fetched successfully",
        },
        404: {
          description: "Not Found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  },

  "/products/feature": {
    get: {
      summary: "Get all featured products",
      tags: ["Products"],
      responses: {
        200: {
          description: "Featured products fetched successfully",
        },
        404: {
          description: "Not Found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  },
};
