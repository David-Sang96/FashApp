import { Schema, model } from "mongoose";

const seedSchema = new Schema({
  key: { type: String, required: true, unique: true },
});

export const Seed = model("Seed", seedSchema);
