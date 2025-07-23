export default function AudioControls({ onPlay, onSkip }) {
    return (
      <div className="flex justify-center items-center gap-4">
        <button onClick={onPlay}>
          <img src="../src/assets/images/play.fill.png" alt="Play" className="w-6 h-6" />
        </button>
        <button onClick={onSkip}>
          <img src="../src/assets/images/forward.fill.png" alt="Next" className="h-6" />
        </button>
      </div>
    );
}
  