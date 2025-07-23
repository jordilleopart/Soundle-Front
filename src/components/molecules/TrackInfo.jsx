export default function TrackInfo({ date, artist, showYear = false, showArtist = false }) {
  const year = date?.split("-")[0];
  return (
    <div className="text-sm text-gray-300 space-y-1">
      {showYear && <p>Release year: {year}</p>}
      {showArtist && <p>Artist: {artist}</p>}
    </div>
  );
}
