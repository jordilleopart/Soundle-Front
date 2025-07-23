import { useNavigate } from "react-router-dom";
import Logo from "../atoms/Logo";
import SearchBar from "../atoms/Searchbar";

export default function Navbar() {
  const navigate = useNavigate();

  const handleDailyChallengeClick = () => {
    const today = new Date().toISOString().split("T")[0]; // Obtiene la fecha actual en formato YYYY-MM-DD
    navigate("/daily", { state: { date: today } }); // Navega a /daily con el estado
  };

  return (
    <header className="flex justify-between items-center md:px-8 bg-black text-white">
      {/* Logo */}
      <Logo />

      {/* Search bar */}
      <div className="w-full md:max-w-md">
        <SearchBar placeholder="Buscar playlists, usuaris o reptes" />
      </div>

      {/* Nav links */}
      <nav className="hidden md:flex space-x-6 text-sm font-medium">
        
        <button onClick={handleDailyChallengeClick} className="hover:underline text-white">
          Daily Challenge
        </button>

        <a href="#" className="hover:underline">
          Recibir ayuda
        </a>
        <a href="#" className="hover:underline">
          Explorar eventos
        </a>
        <a href="#" className="hover:underline">
          Login / Sign in
        </a>
      </nav>

      {/* App button */}
      <button className="hidden md:inline-block bg-white text-black text-sm px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
        Create Playlist
      </button>
    </header>
  );
}