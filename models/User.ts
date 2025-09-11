import { Schema, model, models } from "mongoose";
import { PlansName } from "./enums/plansName";

export const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: String },
    plan: { type: String, enum: Object.values(PlansName), required: true },
    lastPayment: { type: Date },
    taxIdHash: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.User || model("User", userSchema);
