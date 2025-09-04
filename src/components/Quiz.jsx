import { useState, useEffect } from "react";
import Timer from "./Timer";
import Progress from "./Progress";

/**
 * Quiz Component
 * Renders a single-question view with options, timer, progress bar, and navigation buttons.
 */
function Quiz({ questions, current, answers, handleAnswer, nextQuestion }) {
  const [selected, setSelected] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Restore previous selection
  useEffect(() => {
    setSelected(answers[current] !== undefined ? answers[current] : null);
  }, [current, answers]);

  // Next button handler
  const onNext = () => {
    if (!selected) return;
    setIsProcessing(true);
    handleAnswer(selected);
    nextQuestion();
    setTimeout(() => setIsProcessing(false), 300);
  };

  // Skip button handler
  const onSkip = () => {
    setIsProcessing(true);
    handleAnswer("SKIPPED");
    nextQuestion();
    setTimeout(() => setIsProcessing(false), 300);
  };

  // Auto-skip on timer end
  const handleTimeUp = () => {
    if (!selected) handleAnswer("SKIPPED");
    else handleAnswer(selected);
    nextQuestion();
  };

  if (!questions || !questions.length)
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <p className="text-red-600 text-lg">No questions available.</p>
      </div>
    );

  const q = questions[current];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-md p-6 sm:p-8 animate-fadeIn">
        {/* Progress */}
        <Progress current={current} total={questions.length} />

        {/* Timer */}
        <Timer duration={30} onTimeUp={handleTimeUp} current={current} />

        {/* Question */}
        <h2 className="text-lg sm:text-xl font-semibold mb-4">{q.question}</h2>

        {/* Options */}
        <div className="space-y-3">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(opt)}
              disabled={isProcessing}
              className={`w-full text-left px-4 py-2 rounded-lg border transition transform ${
                selected === opt
                  ? "bg-blue-500 text-white border-blue-600"
                  : "bg-gray-100 hover:bg-gray-200 border-gray-300 hover:scale-105"
              } focus:outline-none focus:ring-2 focus:ring-blue-400`}
              aria-pressed={selected === opt}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            disabled={isProcessing}
            onClick={onSkip}
            className={`px-6 py-2 rounded-lg text-white transition ${
              isProcessing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600 hover:scale-105"
            }`}
            aria-label="Skip Question"
          >
            Skip
          </button>
          <button
            disabled={!selected || isProcessing}
            onClick={onNext}
            className={`px-6 py-2 rounded-lg text-white transition ${
              !selected || isProcessing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
            }`}
            aria-label={current < questions.length - 1 ? "Next Question" : "Finish Quiz"}
          >
            {current < questions.length - 1 ? "Next" : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
