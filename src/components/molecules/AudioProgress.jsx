export default function AudioProgress({ value = 0 }) {
    return (
      <progress
        className="w-full h-2 rounded overflow-hidden"
        id="audio-progress"
        value={value}
        max="100"
      />
    );
  }
  