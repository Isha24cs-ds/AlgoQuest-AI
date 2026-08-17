import { useNavigate, useParams } from "react-router-dom";
import { PlusCircle, DoorOpen, ArrowLeft } from "lucide-react";

const battleNames: Record<string, string> = {
  dsa: "DSA Battle",
  development: "Development Battle",
  aiml: "AI / ML Battle",
  core: "Core CS Battle",
};

export default function RoomSelection() {
  const navigate = useNavigate();
  const { battleType } = useParams();

  const battleName =
    battleNames[battleType || ""] || "Arena Battle";

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">

      <div className="w-full max-w-5xl">

        {/* Back */}
        <button
          onClick={() => navigate("/arena")}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-10"
        >
          <ArrowLeft size={20} />
          Back to Arena
        </button>

        {/* Header */}
        <div className="text-center mb-14">

          <p className="text-red-400 font-semibold uppercase tracking-wider">
            Competitive Arena
          </p>

          <h1 className="text-5xl font-bold mt-3">
            {battleName}
          </h1>

          <p className="text-slate-400 mt-4 text-lg">
            Create a private room or join your friend's battle.
          </p>

        </div>

        {/* Options */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Create Room */}
          <div
            onClick={() =>
              navigate(`/arena/create/${battleType}`)
            }
            className="cursor-pointer bg-slate-900 border border-slate-800 rounded-3xl p-10 hover:border-blue-500 hover:scale-105 transition duration-300"
          >

            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center">
              <PlusCircle
                size={38}
                className="text-blue-400"
              />
            </div>

            <h2 className="text-3xl font-bold mt-7">
              Create Room
            </h2>

            <p className="text-slate-400 mt-4">
              Create a private {battleName} and invite your
              friends using a room code.
            </p>

            <div className="mt-8 text-blue-400 font-semibold">
              Create Room →
            </div>

          </div>

          {/* Join Room */}
          <div
            onClick={() =>
              navigate(`/arena/join/${battleType}`)
            }
            className="cursor-pointer bg-slate-900 border border-slate-800 rounded-3xl p-10 hover:border-green-500 hover:scale-105 transition duration-300"
          >

            <div className="w-16 h-16 rounded-2xl bg-green-600/20 flex items-center justify-center">
              <DoorOpen
                size={38}
                className="text-green-400"
              />
            </div>

            <h2 className="text-3xl font-bold mt-7">
              Join Room
            </h2>

            <p className="text-slate-400 mt-4">
              Enter your friend's six-character room code
              and join the battle.
            </p>

            <div className="mt-8 text-green-400 font-semibold">
              Join Room →
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}