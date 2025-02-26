import express from "express";
import Result from "../models/Result.js";

const router = express.Router();

// Save quiz result
router.post("/", async (req, res) => {
  try {
    const { score, totalQuestions } = req.body;
    const result = new Result({ score, totalQuestions });
    await result.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error saving result" });
  }
});

// Get all results
router.get("/", async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Error fetching results" });
  }
});

export default router;
