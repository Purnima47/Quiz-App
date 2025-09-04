import { useState, useEffect } from "react";

/**
 * Timer Component
 * Countdown timer for a quiz question with visual progress bar.
 * 
 * Props:
 * - duration: Total time for the timer in seconds (default: 30)
 * - onTimeUp: Callback function to trigger when timer reaches 0
 * - current: Current question index (used to reset timer when question changes)
 */
function Timer({ duration = 30, onTimeUp, current }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  // Reset timer whenever a new question is loaded or duration changes
  useEffect(() => {
    setTimeLeft(duration);
  }, [current, duration]);

  // Countdown logic
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp(); // Trigger callback when timer reaches 0
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer); // Clear timeout on cleanup
  }, [timeLeft, onTimeUp]);

  return (
    <div className="mb-4 flex justify-between items-center">
      {/* Textual timer */}
      <p className="text-sm font-medium">
        Time left:{" "}
        <span className={timeLeft <= 5 ? "text-red-600 font-bold" : "text-gray-800"}>
          {timeLeft}s
        </span>
      </p>

      {/* Visual progress bar */}
      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-1000"
          style={{ width: `${(timeLeft / duration) * 100}%` }} // Dynamic width
        />
      </div>
    </div>
  );
}

export default Timer;
