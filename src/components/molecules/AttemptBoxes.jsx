export default function AttemptBoxes({ total = 4, current = 0, correct = false }) {
    return (
      <div className="flex gap-2 justify-center">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded ${
              i < current ? "bg-red-500" : "bg-zinc-700"
            }`}
          />
        ))}
      </div>
    );
  }
  