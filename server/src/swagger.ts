import { authSwaggerDocs } from "./docs/auth.docs";
import { productSwaggerDocs } from "./docs/product.docs";
import { userSwaggerDocs } from "./docs/user.docs";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "FASH API",
    version: "1.0.0",
  },

  servers: [{ url: "http://localhost:4000/api/v1" }],

  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "accessToken",
      },
    },

    schemas: {
      /* ================= PRODUCT ================= */
      Product: {
        type: "object",
        properties: {
          _id: { type: "string", example: "65f1b8a7c8d2f94a2c9a9a12" },
          name: { type: "string", example: "Nike Air Max" },
          description: {
            type: "string",
            example: "<p>Comfortable running shoes</p>",
          },
          price: { type: "number", example: 120 },
          category: { type: "string", example: "Shoes" },
          sizes: {
            type: "array",
            items: { type: "string", example: "M" },
          },
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
          images: {
            type: "array",
            items: {
              type: "object",
              properties: {
                url: {
                  type: "string",
                  example:
                    "https://res.cloudinary.com/demo/image/upload/sample.webp",
                },
                public_id: {
                  type: "string",
                  example: "fashApp/products/sample",
                },
              },
            },
          },
          is_newArrival: { type: "boolean", example: true },
          is_feature: { type: "boolean", example: false },
          userId: {
            type: "string",
            example: "65f1b8a7c8d2f94a2c9a9a11",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },

      /* ================= PAGINATION ================= */
      PaginatedProductsResponse: {
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

      /* ================= CURSOR ================= */
      CursorProductsResponse: {
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

      /* ================= ERROR ================= */
      ErrorResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          message: { type: "string", example: "Product not found" },
        },
      },
    },
  },

  paths: {
    ...authSwaggerDocs,
    ...userSwaggerDocs,
    ...productSwaggerDocs,
  },
};

export const swaggerSpec = swaggerDefinition;

// import swaggerJsdoc from "swagger-jsdoc";

// export const swaggerSpec = swaggerJsdoc({
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "FASH API",
//       version: "1.0.0",
//       description: "Full authentication API docs",
//     },
//     servers: [{ url: "http://localhost:4000/api/v1" }],
//     components: {
//       securitySchemes: {
//         cookieAuth: {
//           type: "apiKey",
//           in: "cookie",
//           name: "accessToken",
//         },
//       },
//     },
//   },
//   apis: ["./src/controllers/**/*.ts"], // point to your  controller
// });

// ===========================================================================

// import swaggerJsdoc from "swagger-jsdoc";

// export const swaggerSpec = swaggerJsdoc({
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "FASH API",
//       version: "1.0.0",
//       description: "API documentation",
//     },
//     servers: [
//       {
//         url: "http://localhost:4000/api/v1",
//       },
//     ],
//   },
//   apis: ["./src/routes/**/*.ts"], // where you write docs
// });
