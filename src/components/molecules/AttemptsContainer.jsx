import AttemptCard from "../atoms/AttemptCard";

export default function AttemptsContainer({ failedAttempts = [] }) {
  return (
    <div className="p-4 h-full">
      <div className="space-y-3 max-h-140 overflow-y-auto">
        {failedAttempts.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            No failed attempts yet. Good luck!
          </p>
        ) : (
          failedAttempts.map((attempt, index) => (
            <AttemptCard
              key={index}
              attemptNumber={index + 1}
              guess={attempt.guess}
              timestamp={attempt.timestamp}
            />
          ))
        )}
      </div>
    </div>
  );
}