import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL; // Use env variable

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch questions on mount
  useEffect(() => {
    axios.get(`${API_URL}/api/questions`)
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          setQuestions(res.data);
          setLoading(false);
          console.log("✅ Questions fetched successfully!");
        } else {
          console.error("❌ Invalid question format:", res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching questions:", err);
        setLoading(false);
      });
  }, []);

  const handleAnswer = (index) => {
    if (!questions[currentQuestion]) {
      console.error("❌ Invalid question data");
      return;
    }

    const selectedOption = questions[currentQuestion].options[index];
    const correctAnswer = questions[currentQuestion].answer;

    if (!selectedOption || !correctAnswer) {
      console.error("❌ Invalid option or answer");
      return;
    }

    const isAnswerCorrect = selectedOption.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
    setIsCorrect(isAnswerCorrect);
    setSelectedAnswer(index);

    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        // Send final score to the backend
        axios.post(`${API_URL}/api/results`, {
          score: isAnswerCorrect ? score + 1 : score, // Ensure latest score is used
          totalQuestions: questions.length,
        })
        .then(() => navigate("/result"))
        .catch((err) => console.error("❌ Error saving result:", err));
      }
    }, 1000);
  };

  return (
    <div className="quiz-container">
      {loading ? (
        <p>Loading questions...</p>
      ) : questions.length > 0 ? (
        <>
          <h2>{currentQuestion + 1}. {questions[currentQuestion].question}</h2>
          <div className="options-container">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`option-btn 
                  ${selectedAnswer !== null 
                    ? option === questions[currentQuestion].answer 
                      ? "correct" 
                      : selectedAnswer === index 
                        ? "wrong" 
                        : "" 
                    : ""}`}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null} // Prevent multiple clicks
              >
                {option}
              </button>
            ))}
          </div>
          {selectedAnswer !== null && (
            <p className={`answer-feedback ${isCorrect ? "correct-text" : "wrong-text"}`}>
              {isCorrect ? "✅ Correct!" : "❌ Wrong!"}
            </p>
          )}
        </>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
};

export default QuizPage;
