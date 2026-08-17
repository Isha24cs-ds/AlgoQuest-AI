import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, LogIn } from "lucide-react";

const battleNames: Record<string, string> = {
  dsa: "DSA Battle",
  development: "Development Battle",
  aiml: "AI / ML Battle",
  core: "Core CS Battle",
};

export default function JoinRoom() {
  const navigate = useNavigate();
  const { battleType } = useParams();

  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);

  const battleName =
    battleNames[battleType || ""] || "Arena Battle";

  async function joinRoom() {
    if (!roomCode.trim()) {
      alert("Please enter a room code");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/v1/arena/join",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomCode: roomCode.trim().toUpperCase(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Room not found");
      }

      navigate(`/arena/lobby/${data.room.roomCode}`);

    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to join room"
      );
    } finally {
      setLoading(false);
    }
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

          <p className="text-green-400 font-semibold">
            {battleName}
          </p>

          <h1 className="text-4xl font-bold mt-3">
            Join Arena Room
          </h1>

          <p className="text-slate-400 mt-3">
            Enter the six-character code shared by your friend.
          </p>

          <input
            type="text"
            value={roomCode}
            onChange={(e) =>
              setRoomCode(e.target.value.toUpperCase())
            }
            maxLength={6}
            placeholder="ENTER CODE"
            className="w-full mt-10 bg-slate-800 border border-slate-700 rounded-xl px-5 py-5 text-center text-3xl font-bold tracking-[0.4em] uppercase outline-none focus:border-green-500"
          />

          <button
            onClick={joinRoom}
            disabled={loading}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-slate-700 py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 transition"
          >
            <LogIn size={22} />

            {loading ? "Joining Room..." : "Join Room"}
          </button>

        </div>

      </div>

    </div>
  );
}