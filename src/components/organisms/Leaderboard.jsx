export default function Leaderboard() {
    return (
      <div className="leaderboard border border-zinc-700 rounded p-4 w-full md:w-1/4 bg-zinc-900">
        <h2 className="text-lg font-bold mb-2">Users in Game</h2>
        <div className="leaderboard-list space-y-2">
          {/* Aquí irán los usuarios conectados dinámicamente */}
          <p className="text-sm text-gray-400">[user list]</p>
        </div>
      </div>
    );
  }
  