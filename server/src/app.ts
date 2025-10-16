import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json, urlencoded } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { ENV_VARS } from "./config/envVars";
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

app
  .use(morgan("dev"))
  .use(urlencoded({ extended: true }))
  .use(json())
  .use(cookieParser())
  .use(cors(corsOptions))
  .use(helmet())
  .use(compression());

app.use(routes);

app.use(errorHandler);
