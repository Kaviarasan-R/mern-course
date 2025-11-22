import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const UserSchema = new Schema(
  {
    userId: {
      type: String,
      unique: true,
      default: () => uuidv4(),
    },
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default model("users", UserSchema);
