export default function AttemptCard({ attemptNumber, guess, timestamp }) {
    return (
      <div className="p-3 rounded-lg border bg-gray-800 border-gray-600">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-300">
            Attempt #{attemptNumber}
          </span>
          <span className="text-xs text-gray-400">
            {timestamp}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-white">
            {guess || "Skipped"}
          </span>
          <span className="text-sm text-red-400">
            ✗ Wrong
          </span>
        </div>
      </div>
    );
  }