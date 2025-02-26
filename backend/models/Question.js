import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: Number, // Index of correct option
});

export default mongoose.model("Question", questionSchema);
