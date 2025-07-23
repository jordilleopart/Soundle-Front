import { useState, useEffect } from "react";
import TrackImage from "../molecules/TrackImage";
import TrackInfo from "../molecules/TrackInfo";
import Timer from "../molecules/Timer";
import AudioControls from "../molecules/AudioControls";
import AttemptBoxes from "../molecules/AttemptBoxes";
import UserInput from "../molecules/UserInput";
import AudioProgress from "../molecules/AudioProgress";
import { config } from "../../lib/helpers/utils.js";
import VictoryBanner from "../atoms/VictoryBanner";

// Agrega este estado al componente Challenge
export default function Challenge({ date, failedAttempts, setFailedAttempts }) {
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [trackInfo, setTrackInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hintsShown, setHintsShown] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false); // Estado para victoria
  const [gameOver, setGameOver] = useState(false); // Estado para fin del juego

  // Function to fetch track information from the backend
  const fetchTrackInfo = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      console.log("Token retrieved:", token);

      const url = `${config.address}/track/track-by-date/${date}`;
      console.log("Request URL:", url); // Debug: Log the request URL

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.text(); // Use .text() to read the raw response
        console.error("Error response from server:", errorData);
        throw new Error("Failed to fetch track information");
      }

      const data = await response.json();
      console.log("Track information received:", data);
      setTrackInfo(data);

    } catch (err) {
      console.error("Error fetching track information:", err);
      setError("Failed to load track information");
    } finally {
      setLoading(false);
    }
  };

  // Call fetchTrackInfo when the component mounts
  useEffect(() => {
    if (date) {
      fetchTrackInfo();
    }
  }, [date]);

  const handlePlay = () => {
    console.log("Play button clicked");
    // Logic to play audio
  };

  const handleSkip = () => {
    console.log("Skip button clicked");
    
    if (hintsShown >= 4) {
      setGameOver(true); // End the game after 4 hints
      console.log("Game over! Too many hints shown.");
      return;
    }
    
    const newFailedAttempt = {
      guess: "", // Skip no tiene guess
      timestamp: new Date().toLocaleTimeString()
    };
    
    setFailedAttempts(prev => [...prev, newFailedAttempt]);
    setHintsShown((prev) => prev + 1);
    setAttempts((prev) => prev + 1);
  };

  const handleGuessSubmit = () => {
    if (!guess.trim() || gameOver) return;
    
    const isAnswerCorrect = guess.toLowerCase().trim() === trackInfo?.track_name.toLowerCase();
    
    if (!isAnswerCorrect) {
      const newFailedAttempt = {
        guess: guess.trim(),
        timestamp: new Date().toLocaleTimeString()
      };
      
      setFailedAttempts(prev => [...prev, newFailedAttempt]);
      setHintsShown((prev) => prev + 1);

      if (hintsShown >= 4) {
        setGameOver(true); // End the game after 4 hints
        console.log("Game over! Too many hints shown.");
      }

    } else {
      // Usuario acertó
      setIsCorrect(true);
      setGameOver(true);
      setHintsShown(999); // Mostrar todas las pistas
      console.log("Correct guess!");
    }
    
    setAttempts((prev) => prev + 1);
    setGuess(""); // Limpiar el input después del intento
  };

  const handleGuessChange = (e) => {
    if (!gameOver) {
      setGuess(e.target.value);
    }
  };

  if (loading) {
    return <p className="text-gray-400">Loading track information...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Dentro del componente principal
  const getHintState = (hintsShown, isCorrect) => {
    if (isCorrect) {
      // Si la respuesta es correcta, mostrar todo sin restricciones
      return {
        filterLevel: 2, // Imagen sin filtro
        showYear: true,
        showArtist: true,
        showSongName: true,
      };
    }

    // Si no es correcto, manejar según las pistas mostradas
    switch (hintsShown) {
      case 0:
        return {
          filterLevel: 0, // Filtered image 
          showYear: false,
          showArtist: false,
          showSongName: false,
        };
      case 1:
        return {
          filterLevel: 1, // Less filtered image
          showYear: false, 
          showArtist: false,
          showSongName: false,
        };

      case 2:
        return {
          filterLevel: 1, 
          showYear: true, // Show year
          showArtist: false,
          showSongName: false,
        };
      case 3:
        return {
          filterLevel: 2, // Unfiltered image
          showYear: true,
          showArtist: false,
          showSongName: false,
        };
      case 4:
      return {
        filterLevel: 2, // Unfiltered image
        showYear: true,
        showArtist: true,
        showSongName: false,
      };
      default:
        return {
          filterLevel: 2, // Imagen sin filtro
          showYear: true,
          showArtist: true,
          showSongName: false,
        };
    }
  };

  // Obtener el estado de las pistas
  const hintState = getHintState(hintsShown, isCorrect);

  return (
    <div className="flex-1 flex flex-col items-center gap-4">
      <p className="text-xl font-semibold text-white">Challenge {date || "No se recibió fecha"}</p>
      
      {trackInfo && (
        <>
          <TrackImage
            src={trackInfo.track_cover_url}
            filterLevel={hintState.filterLevel} // Usar el nivel de filtro según las pistas o si es correcto
            hidden={false}
          />

          <TrackInfo
            date={trackInfo.track_release_date}
            artist={trackInfo.track_artist}
            showYear={hintState.showYear} // Mostrar según las pistas o si es correcto
            showArtist={hintState.showArtist} // Mostrar según las pistas o si es correcto
          />
          
          {/* Mostrar nombre de la canción si es correcto */}
          {hintState.showSongName && (
            <div className="text-center">
              <p className="text-lg font-bold text-green-700">Song: {trackInfo.track_name}</p>
            </div>
          )}
        </>
      )}
      
      <Timer seconds={30} />
      <AudioControls onPlay={handlePlay} onSkip={handleSkip} disabled={gameOver} />
      <AttemptBoxes total={5} current={attempts} />
      <UserInput 
        value={guess} 
        onChange={handleGuessChange} 
        onSubmit={handleGuessSubmit}
        disabled={gameOver}
      />
      {/* Banner de victoria 
      {isCorrect && trackInfo && (
        <VictoryBanner 
          trackName={trackInfo.track_name} 
          attempts={attempts}
        />
      )}*/}
    </div>
  );
}
