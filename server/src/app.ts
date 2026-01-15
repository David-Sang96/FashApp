import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json, urlencoded } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { ENV_VARS } from "./config/envVars";
import passport from "./config/passport";
import { swaggerSpec } from "./docs/swagger";
import { errorHandler } from "./middlewares/errorHandler";
import routes from "./routes/v1";

export const app = express();

const whiteList = ["https://example.com", ENV_VARS.CLIENT_URL];
const corsOptions = {
  origin: function (
    origin: any,
    callback: (err: Error | null, origin?: any) => void
  ) {
    // allow requests with no origin (eg. mobile app and curl request(s) like postman third party software)
    if (!origin) return callback(null, true);
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies or authorization header
};

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // Limit each IP to 100 requests per 15 mins
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(passport.initialize());

// 1. Logging & Security (The Shield)
app
  .use(morgan("dev"))
  .use(helmet()) // Security first
  .use(cors(corsOptions))
  .use(compression()); // Compress everything after security

// 2. Data Parsers (The Translators)
app
  .use(cookieParser())
  .use(json()) // Parse body before it hits routes
  .use(urlencoded({ extended: true }));

// 3. Rate Limiting & Routes (The Logic)
app.use("/api/v1", apiLimiter, routes); // The "Bouncer" and the "VIP Section"

// 4. The Safety Net (The Final Destination)
app.use(errorHandler);
