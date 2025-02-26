import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/questions")
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    const isAnswerCorrect = index === questions[currentQuestion].answer;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        axios.post("http://localhost:5000/api/results", { score: score + (isAnswerCorrect ? 1 : 0), totalQuestions: questions.length })
          .then(() => navigate("/result"))
          .catch((err) => console.error("Error saving result:", err));
      }
    }, 1000);
  };

  return (
    <div className="quiz-container">
      {questions.length > 0 ? (
        <>
          <h2>{currentQuestion + 1}. {questions[currentQuestion].question}</h2>
          <div className="options-container">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${selectedAnswer !== null ? (index === questions[currentQuestion].answer ? "correct" : selectedAnswer === index ? "wrong" : "") : ""}`}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
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
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default QuizPage;
