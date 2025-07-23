export default function TrackImage({ src = "", filterLevel = 0 }) {
  let filterClasses = "";

  if (filterLevel === 0) {
    filterClasses = "grayscale blur-2xl opacity-60";
  } else if (filterLevel === 1) {
    filterClasses = "blur-md opacity-90";
  } else {
    filterClasses = "blur-none opacity-100";
  }

  return (
    <div className="w-90 h-90 bg-zinc-800 rounded-lg overflow-hidden flex items-center justify-center">
      <img
        src={src}
        alt="Track Cover"
        className={`w-full h-full object-cover transition-all duration-300 ${filterClasses}`}
      />
    </div>
  );
}
