import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import questionRoutes from "./routes/questionRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

app.use("/api/questions", questionRoutes);
app.use("/api/results", resultRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
