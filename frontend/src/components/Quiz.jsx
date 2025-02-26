import { useState } from "react";
import PropTypes from "prop-types";

const Quiz = ({ questions, navigate }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (selectedIndex) => {
    if (selectedIndex === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      navigate("/result");
    }
  };

  return (
    <div className="quiz">
      <h2>{questions[currentQuestion].question}</h2>
      {questions[currentQuestion].options.map((option, index) => (
        <button key={index} onClick={() => handleAnswer(index)}>
          {option}
        </button>
      ))}
    </div>
  );
};

// ✅ Add PropTypes Validation
Quiz.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      answer: PropTypes.number.isRequired,
    })
  ).isRequired,
  navigate: PropTypes.func.isRequired,
};

export default Quiz;
