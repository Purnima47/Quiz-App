import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Quiz from "./components/Quiz.jsx";
import Results from "./components/Results.jsx";

/**
 * Utility: Decode HTML entities (&quot;, &amp;, etc.)
 * @param {string} html - String containing HTML entities
 * @returns {string} Decoded string
 */
function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

/**
 * Main App Component
 * Handles routing, state management, API/local question fetch, difficulty selection,
 * answer storage, and quiz restart functionality.
 */
function App() {
  // -------------------- Global State --------------------
  const [questions, setQuestions] = useState([]);   // List of quiz questions
  const [current, setCurrent] = useState(0);        // Current question index
  const [answers, setAnswers] = useState([]);       // User-selected answers
  const [loading, setLoading] = useState(true);     // Loading state
  const [error, setError] = useState(null);         // Error state
  const [difficulty, setDifficulty] = useState("easy"); // Selected difficulty
  const navigate = useNavigate();

  // -------------------- Fetch Questions --------------------
  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchQuestions = async () => {
      try {
        // 1️⃣ Try fetching from API
        const res = await fetch(
          `https://opentdb.com/api.php?amount=10&type=multiple&difficulty=${difficulty}`
        );
        const data = await res.json();

        if (!data?.results?.length) throw new Error("No API results");

        // Format questions: decode HTML entities and shuffle options
        const formatted = data.results.map((q) => {
          const options = [...q.incorrect_answers, q.correct_answer].sort(
            () => Math.random() - 0.5
          );
          return {
            question: decodeHTML(q.question),
            options: options.map((opt) => decodeHTML(opt)),
            correct: decodeHTML(q.correct_answer),
            difficulty: difficulty,
          };
        });

        setQuestions(formatted);
      } catch (apiError) {
        console.warn("❌ API failed, trying local JSON...", apiError);

        // 2️⃣ Fallback to local JSON file
        try {
          const res = await fetch("/questions.json");
          if (!res.ok) throw new Error("questions.json not found");
          const data = await res.json();

          // Filter local questions by selected difficulty
          const filtered = data.filter((q) => q.difficulty === difficulty);

          if (!filtered.length) throw new Error("No questions for selected difficulty");

          setQuestions(filtered);
        } catch (jsonError) {
          console.error("❌ Both API and local JSON failed", jsonError);
          setError("Could not load questions. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [difficulty]); // Refetch when difficulty changes

  // -------------------- Save Answer --------------------
  const handleAnswer = (answer) => {
    setAnswers((prev) => {
      const newAns = [...prev];
      newAns[current] = answer;
      return newAns;
    });
  };

  // -------------------- Next Question --------------------
  const nextQuestion = () => {
    if (current < questions.length - 1) setCurrent((prev) => prev + 1);
    else navigate("/results");
  };

  // -------------------- Restart Quiz --------------------
  /**
   * Restart quiz or navigate to a specified route
   * @param {string} route - Optional route to navigate to (default: /quiz)
   */
  const restartQuiz = (route = "/quiz") => {
    setCurrent(0);
    setAnswers([]);
    navigate(route);
  };

  // -------------------- Difficulty Selection --------------------
  const selectDifficulty = (level) => {
    setDifficulty(level);
    setCurrent(0);
    setAnswers([]);
    navigate("/quiz");
  };

  // -------------------- Routes --------------------
  return (
    <Routes>
      {/* Default route redirects to difficulty selection */}
      <Route path="/" element={<Navigate to="/difficulty" replace />} />

      {/* Difficulty Selection Screen */}
      <Route
        path="/difficulty"
        element={
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            {/* Header */}
            <h1 className="text-4xl font-extrabold mb-8 text-indigo-700 animate-fadeIn">
              🎯 Select Difficulty
            </h1>

            {/* Difficulty Options */}
            <div className="flex flex-col sm:flex-row gap-6">
              {[
                { level: "easy", color: "green", emoji: "🌱" },
                { level: "medium", color: "yellow", emoji: "⚡" },
                { level: "hard", color: "red", emoji: "🔥" },
              ].map(({ level, color, emoji }) => (
                <button
                  key={level}
                  onClick={() => selectDifficulty(level)}
                  className={`
              relative w-60 h-40 sm:w-48 sm:h-48 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center 
              hover:scale-105 hover:shadow-2xl transition-transform duration-300
              focus:outline-none focus:ring-4 focus:ring-${color}-300
            `}
                >
                  <span className="text-6xl mb-4">{emoji}</span>
                  <span className="text-2xl font-bold text-gray-800 capitalize">{level}</span>

                  {/* Animated glow */}
                  <span className={`
              absolute inset-0 rounded-2xl bg-${color}-200 opacity-0 hover:opacity-20 transition-opacity duration-300
            `}></span>
                </button>
              ))}
            </div>
          </div>
        }
      />


      {/* Quiz Route */}
      <Route
        path="/quiz"
        element={
          loading ? (
            <div className="flex items-center justify-center min-h-screen">
              <p className="text-lg">Loading questions...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center min-h-screen">
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <Quiz
              questions={questions}
              current={current}
              answers={answers}
              handleAnswer={handleAnswer}
              nextQuestion={nextQuestion}
            />
          )
        }
      />

      {/* Results Route */}
      <Route
        path="/results"
        element={
          <Results
            questions={questions}
            answers={answers}
            restartQuiz={restartQuiz} // Can pass "/difficulty" for difficulty selection
          />
        }
      />

      {/* Fallback Route */}
      <Route path="*" element={<div className="p-8">Page not found</div>} />
    </Routes>
  );
}

export default App;
