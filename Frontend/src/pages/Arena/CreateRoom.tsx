import { useNavigate, useParams } from "react-router-dom";
import { Copy, ArrowLeft } from "lucide-react";
import { useState } from "react";

const battleNames: Record<string, string> = {
  dsa: "DSA Battle",
  development: "Development Battle",
  aiml: "AI / ML Battle",
  core: "Core CS Battle",
};

export default function CreateRoom() {
  const navigate = useNavigate();
  const { battleType } = useParams();

  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);

  const battleName =
    battleNames[battleType || ""] || "Arena Battle";

  async function createRoom() {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/v1/arena/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            battleType,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to create room");
      }

      setRoomCode(data.room.roomCode);

    } catch (error) {
      console.error(error);
      alert("Failed to create room");
    } finally {
      setLoading(false);
    }
  }

  function copyCode() {
    navigator.clipboard.writeText(roomCode);
    alert("Room code copied!");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">

      <div className="w-full max-w-2xl">

        <button
          onClick={() => navigate(`/arena/room/${battleType}`)}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">

          <p className="text-red-400 font-semibold">
            {battleName}
          </p>

          <h1 className="text-4xl font-bold mt-3">
            Create Arena Room
          </h1>

          <p className="text-slate-400 mt-3">
            Create a room and invite your friends to compete.
          </p>

          {!roomCode ? (
            <button
              onClick={createRoom}
              disabled={loading}
              className="w-full mt-10 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 py-4 rounded-xl text-lg font-semibold transition"
            >
              {loading ? "Creating Room..." : "Generate Room Code"}
            </button>
          ) : (
            <>
              <div className="mt-10">

                <p className="text-slate-400 mb-3">
                  Share this code with your friends
                </p>

                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-7 flex items-center justify-between">

                  <span className="text-4xl font-bold tracking-[0.4em]">
                    {roomCode}
                  </span>

                  <button
                    onClick={copyCode}
                    className="p-3 rounded-lg bg-slate-700 hover:bg-slate-600"
                  >
                    <Copy size={22} />
                  </button>

                </div>

              </div>

              <button
                onClick={() =>
                  navigate(`/arena/lobby/${roomCode}`)
                }
                className="w-full mt-8 bg-green-600 hover:bg-green-700 py-4 rounded-xl text-lg font-semibold transition"
              >
                Enter Waiting Lobby →
              </button>
            </>
          )}

        </div>

      </div>

    </div>
  );
}