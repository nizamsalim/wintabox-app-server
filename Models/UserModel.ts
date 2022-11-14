import { Schema, model } from "mongoose";

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    min: 6,
  },
  followerCount: {
    type: Number,
    default: 0,
  },
  followingCount: {
    type: Number,
    default: 0,
  },
  playlistCount: {
    type: Number,
    default: 0,
  },
});

export default model("users", userSchema);
