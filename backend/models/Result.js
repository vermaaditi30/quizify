import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  score: Number,
  totalQuestions: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Result", resultSchema);
