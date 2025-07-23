import { useLocation } from "react-router-dom";
import { useState } from "react";
import Leaderboard from "../components/organisms/Leaderboard";
import Challenge from "../components/organisms/Challenge";
import AttemptsContainer from "../components/molecules/AttemptsContainer";
import Navbar from "../components/organisms/Navbar";

export default function DailyChallenge() {
  const location = useLocation();
  const { date } = location.state || {}; 
  const [failedAttempts, setFailedAttempts] = useState([]); // Solo intentos fallidos
  
  console.log("Received date:", date); 

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white p-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar : Leaderboard */}
          <aside className="lg:w-1/4">
            <Leaderboard />
          </aside>

          {/* Center: Challenge */}
          <section className="flex-1">
            <Challenge 
              date={date} 
              failedAttempts={failedAttempts}
              setFailedAttempts={setFailedAttempts}
            />
          </section>

          {/* Right Sidebar : Failed Attempts */}
          <aside className="lg:w-1/4">
            <AttemptsContainer failedAttempts={failedAttempts} />
          </aside>
        </div>
      </main>
    </>
  );
}
