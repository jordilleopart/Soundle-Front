export default function VictoryBanner({ trackName, attempts }) {
    return (
      <div className="w-full max-w-md bg-green-600 border border-green-500 rounded-lg p-4 text-center animate-pulse">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">🎉</span>
          <h2 className="text-xl font-bold text-white">Correct!</h2>
          <span className="text-2xl">🎉</span>
        </div>
        <p className="text-green-100 font-semibold text-lg mb-1">
          "{trackName}"
        </p>
        <p className="text-green-200 text-sm">
          You guessed it in {attempts} attempt{attempts !== 1 ? 's' : ''}!
        </p>
      </div>
    );
  }