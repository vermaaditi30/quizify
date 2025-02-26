import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>🧠 Welcome to the Ultimate Quiz Challenge! 🎉</h1>
        <p>Test your knowledge and challenge yourself with exciting questions.</p>
        <button className="start-btn" onClick={() => navigate("/quiz")}>
          🚀 Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Home;
