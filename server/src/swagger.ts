import { authSwaggerDocs } from "./docs/auth.docs";
import { productSwaggerDocs } from "./docs/product.docs";
import { userSwaggerDocs } from "./docs/user.docs";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: { title: "FASH API", version: "1.0.0" },
  servers: [{ url: "http://localhost:4000/api/v1" }],
  components: {
    securitySchemes: {
      cookieAuth: { type: "apiKey", in: "cookie", name: "accessToken" },
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
