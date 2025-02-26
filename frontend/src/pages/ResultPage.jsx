import  { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ResultPage = () => {
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/results")
      .then((res) => {
        if (res.data.length > 0) {
          const lastResult = res.data[res.data.length - 1];
          setScore(lastResult.score);
          setTotalQuestions(lastResult.totalQuestions);
        }
      })
      .catch((err) => console.error("Error fetching results:", err));
  }, []);

  const getMessage = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 80) return "🎉 Amazing! You're a genius!";
    if (percentage >= 50) return "😊 Good Job! Keep practicing!";
    return "😢 Better luck next time!";
  };

  return (
    <div className="result-container">
      <h1>Quiz Completed!</h1>
      <h2>Your Score: {score} / {totalQuestions}</h2>
      <p className="result-message">{getMessage()}</p>
      <button onClick={() => navigate("/")}>Play Again</button>
    </div>
  );
};

export default ResultPage;
