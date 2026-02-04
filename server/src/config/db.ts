import mongoose from "mongoose";
import { ENV_VARS } from "./envVars";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV_VARS.MONGO_URI!);
    console.log(`MongoDB connnected :${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connection to MongoDB: ${error}`);
    process.exit(1);
  }
};

// graceful shutdown
process.on("SIGINT", async () => {
  console.log("App interrupted");
  await mongoose.disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("App terminated");
  await mongoose.disconnect();
  process.exit(0);
});

/*
| Signal  | Meaning            | Example               |
| ------- | ------------------ | --------------------- |
| SIGINT  | User stopped app   | Ctrl + C              |
| SIGTERM | System stopped app | Docker / PM2 / server |



| Exit code | Meaning | What happens             |
| --------- | ------- | ------------------------ |
| `0`       | Success | Normal shutdown          |
| `1`       | Error   | Restart / mark as failed |

0 → all good 👍
1 → something broke 💥

*/
