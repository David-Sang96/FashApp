import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, {
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { ENV_VARS } from "./config/envVars";
import passport from "./config/passport";
import { errorHandler } from "./middlewares/errorHandler";
import routes from "./routes/v1";
import { swaggerSpec } from "./swagger";

export const app = express();

const whiteList = ["https://example.com", ENV_VARS.CLIENT_URL];
const corsOptions = {
  origin: function (
    origin: any,
    callback: (err: Error | null, origin?: any) => void,
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
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"],
};

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  next();
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
app.use("/api/v1", routes); // The "Bouncer" and the "VIP Section"

// 4. The Safety Net (The Final Destination)
app.use(errorHandler);
