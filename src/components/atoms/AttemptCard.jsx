export default function AttemptCard({ attemptNumber, guess, timestamp }) {
    return (
      <div className="p-3 rounded-xl border bg-red-600/50  border-transparent">
        <div className="flex items-center justify-between items-center mb-2">
          <span className="text-sm font-medium text-red-400">
            Attempt #{attemptNumber}
          </span>
          <span className="font-semibold text-red-500 truncate max-w-[140px]">
            {guess || "Skipped"}
          </span>
          <span className="text-xs text-red-400">
            {timestamp}
          </span>
        </div>
      </div>
    );
  }