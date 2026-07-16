import { completeEasyQuest } from "../../engine/GameEngine";

function MissionButton() {
  return (
    <button
      onClick={() => {
        completeEasyQuest();
        alert("Mission Completed!");
      }}
      className="bg-blue-600 text-white px-6 py-3 rounded-xl"
    >
      Complete Easy Mission
    </button>
  );
}

export default MissionButton;