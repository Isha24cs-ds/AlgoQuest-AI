import { player } from "../../store/gameStore";

function PlayerHUD() {
  return (
    <div className="fixed top-4 right-4 bg-slate-900 text-white rounded-2xl p-4 w-64 border border-slate-700">
      <h2 className="text-xl font-bold mb-3">Player Stats</h2>

      <p>⭐ Level : {player.level}</p>
      <p>✨ XP : {player.xp}</p>
      <p>🪙 Coins : {player.coins}</p>
      <p>❤️ Hearts : {player.hearts}</p>
      <p>🔥 Streak : {player.streak}</p>
    </div>
  );
}

export default PlayerHUD;