/**
 * Progress Component
 * Displays a progress bar showing the current question number out of the total.
 *
 * Props:
 * - current: Current question index (1-based)
 * - total: Total number of questions
 */
function Progress({ current, total }) {
  // Calculate completion percentage
  const percent = (current / total) * 100;

  return (
    <div className="mb-4">
      {/* Text indicator */}
      <p className="text-sm mb-1">
        Question {current} of {total}
      </p>

      {/* Background bar */}
      <div className="w-full bg-gray-200 h-2 rounded">
        {/* Foreground progress */}
        <div
          className="bg-blue-500 h-2 rounded transition-all duration-500"
          style={{ width: `${percent}%` }} // Dynamic width based on progress
        />
      </div>
    </div>
  );
}

export default Progress;
