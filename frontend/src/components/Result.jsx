
import PropTypes from "prop-types";

const Result = ({ score, totalQuestions }) => {
  return (
    <div className="result">
      <h1>Quiz Completed!</h1>
      <h2>Your Score: {score} / {totalQuestions}</h2>
      <button onClick={() => window.location.href = "/"}>Play Again</button>
    </div>
  );
};

// ✅ Add PropTypes Validation
Result.propTypes = {
  score: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
};

export default Result;
