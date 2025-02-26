import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import questionRoutes from "./routes/questionRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/questions", questionRoutes);
app.use("/api/results", resultRoutes);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.log(err));
