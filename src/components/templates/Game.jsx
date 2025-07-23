import Leaderboard from "../organisms/Leaderboard";
import Challenge from "../organisms/Challenge";
import Chat from "../organisms/Chat";

export default function Game() {
  return (
    <div className="game-container flex flex-col gap-4 md:flex-row md:gap-8">
      <Leaderboard />
      <Challenge />
      <Chat />
    </div>
  );
}
