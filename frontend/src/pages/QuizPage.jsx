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
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          setQuestions(res.data);
          console.log("✅ API is working - Questions fetched successfully!");
        } else {
          console.error("❌ Invalid questions format:", res.data);
        }
      })
      .catch((err) => console.error("❌ Error fetching questions:", err));
  }, []);

  const handleAnswer = (index) => {
    if (!questions[currentQuestion] || !questions[currentQuestion].answer) {
      console.error("❌ Question or answer is undefined");
      return;
    }

    const selectedOption = questions[currentQuestion].options[index];
    const correctAnswer = questions[currentQuestion].answer;

    if (selectedOption && correctAnswer) {
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
          axios.post("http://localhost:5000/api/results", {
            score: score + (isAnswerCorrect ? 1 : 0),
            totalQuestions: questions.length,
          })
          .then(() => navigate("/result"))
          .catch((err) => console.error("❌ Error saving result:", err));
        }
      }, 1000);
    } else {
      console.error("❌ Invalid answer or selected option");
    }
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
                className={`option-btn 
                  ${selectedAnswer !== null 
                    ? (option === questions[currentQuestion].answer ? "correct" : selectedAnswer === index ? "wrong" : "") 
                    : ""}`}
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
