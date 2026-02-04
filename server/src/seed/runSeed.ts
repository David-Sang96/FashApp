import mongoose from "mongoose";
import { ENV_VARS } from "../config/envVars";
import { Product } from "../models/product.model";
import { products } from "./product.seed";

async function runSeed() {
  await mongoose.connect(ENV_VARS.MONGO_URI!);

  const existing = await Product.findOne({});
  if (existing) {
    console.log("Products already exist. Skipping seed.");
    process.exit(0);
  }

  await Product.insertMany(products);
  console.log("Products seeded successfully");
  process.exit(0);
}

runSeed();
