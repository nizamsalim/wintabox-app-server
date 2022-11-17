import { Schema, model } from "mongoose";

const optSchema: Schema = new Schema({
  otp: String,
  expiry: Date,
  email: String,
});

export default model("otp", optSchema);
