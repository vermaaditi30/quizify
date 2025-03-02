import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

// ✅ Fetch 10 Random Questions
router.get("/", async (req, res) => {
  try {
    const questions = await Question.aggregate([{ $sample: { size: 10 } }]); // Get random 10 questions

    // ✅ Format the response (Ensure correct field names)
    const formattedQuestions = questions.map(({ _id, question, options, correctAnswer }) => ({
      id: _id,
      question,
      options,
      answer: correctAnswer, // ✅ Fix: Rename correctAnswer to answer for frontend compatibility
    }));

    res.json(formattedQuestions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Error fetching questions", error: error.message });
  }
});

export default router;
