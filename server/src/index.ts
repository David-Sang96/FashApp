// import "dotenv/config";
import dotenvFlow from "dotenv-flow";
dotenvFlow.config();

import { app } from "./app";
import { connectDB } from "./config/db";
import { ENV_VARS } from "./config/envVars";

const PORT = ENV_VARS.PORT || 5000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on PORT : ${PORT}`);
});
