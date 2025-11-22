import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export default model("posts", PostSchema);
