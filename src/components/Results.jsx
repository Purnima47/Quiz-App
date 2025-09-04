import {
  CheckCircleIcon,
  XCircleIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/solid";

/**
 * Results Component
 * Displays final quiz results with score, detailed feedback, and restart options.
 *
 * Props:
 * - questions: Array of questions { question, options, correct }
 * - answers: Array of user-selected answers (or "SKIPPED")
 * - restartQuiz: Callback function to restart the quiz or navigate to difficulty
 */
function Results({ questions, answers, restartQuiz }) {
  // Calculate score
  const score = answers.reduce((acc, ans, idx) => {
    if (ans === questions[idx].correct) return acc + 1;
    return acc;
  }, 0);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6 sm:p-10">
        {/* Header */}
        <h2 className="text-3xl font-bold mb-4 text-center text-indigo-700">
          🎉 Quiz Results
        </h2>
        <p className="text-lg mb-8 text-center">
          You scored{" "}
          <span className="font-bold text-indigo-600">
            {score} / {questions.length}
          </span>
        </p>

        {/* Results List */}
        <div className="space-y-6">
          {questions.map((q, idx) => {
            const userAnswer = answers[idx];
            const isSkipped = userAnswer === "SKIPPED";
            const isCorrect = userAnswer === q.correct;

            return (
              <div
                key={idx}
                className="p-5 border rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition"
              >
                {/* Question */}
                <p className="font-semibold mb-3 text-gray-800">
                  Q{idx + 1}. {q.question}
                </p>

                {/* Options */}
                <div className="space-y-2">
                  {q.options.map((opt, i) => {
                    let boxClass =
                      "px-4 py-2 rounded-lg border w-full text-left transition ";

                    if (opt === q.correct) {
                      boxClass += "bg-green-100 border-green-400 text-green-800";
                    }
                    if (opt === userAnswer && !isCorrect && !isSkipped) {
                      boxClass += " bg-red-100 border-red-400 text-red-800";
                    }
                    if (isSkipped && opt === q.correct) {
                      boxClass +=
                        " bg-yellow-100 border-yellow-400 text-yellow-800";
                    }

                    return (
                      <div key={i} className={boxClass}>
                        {opt}
                      </div>
                    );
                  })}
                </div>

                {/* Status Icons */}
                <div className="flex items-center gap-2 mt-3">
                  {isSkipped ? (
                    <MinusCircleIcon className="h-6 w-6 text-yellow-500" />
                  ) : isCorrect ? (
                    <CheckCircleIcon className="h-6 w-6 text-green-600" />
                  ) : (
                    <XCircleIcon className="h-6 w-6 text-red-600" />
                  )}
                  <span
                    className={`${
                      isSkipped
                        ? "text-yellow-600"
                        : isCorrect
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {isSkipped ? "Skipped" : isCorrect ? "Correct" : "Wrong"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex justify-center gap-6">
          {/* Restart Quiz */}
          <button
            onClick={() => restartQuiz("/quiz")}
            className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg shadow transition"
          >
            🔄 Restart Quiz
          </button>

          {/* Change Difficulty */}
          <button
            onClick={() => restartQuiz("/difficulty")}
            className="px-6 py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-lg shadow transition"
          >
            🎯 Change Difficulty
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;
