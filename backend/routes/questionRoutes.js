import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

// Get all questions
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find().limit(10);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions" });
  }
});

export default router;
