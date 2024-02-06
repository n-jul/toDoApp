import mongoose from "mongoose"

const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    todo: {
      type: String,
      required: true,
    },

    uid: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Todos =  mongoose.model("Todos", todoSchema);
