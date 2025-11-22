import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const PostSchema = new Schema(
  {
    postId: {
      type: String,
      unique: true,
      default: () => uuidv4(),
    },
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export default model("posts", PostSchema);
