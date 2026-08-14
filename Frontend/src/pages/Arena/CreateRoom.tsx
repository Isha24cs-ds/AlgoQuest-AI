import { useState } from "react";
import { Copy } from "lucide-react";

export default function CreateRoom() {
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function createRoom() {
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/arena/create",
        {
          method: "POST",
        }
      );

      const data = await response.json();

      setRoomCode(data.room.roomCode);
    } catch (err) {
      console.error(err);
      alert("Failed to create room");
    }

    setLoading(false);
  }

  function copyCode() {
    navigator.clipboard.writeText(roomCode);
    alert("Room code copied!");
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">

      <div className="bg-slate-900 rounded-3xl p-10 w-[600px] border border-slate-800">

        <h1 className="text-4xl font-bold">
          Create Arena Room
        </h1>

        <p className="text-slate-400 mt-3">
          Generate a room and invite your friends.
        </p>

        {!roomCode ? (

          <button
            onClick={createRoom}
            disabled={loading}
            className="mt-10 w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl text-xl font-semibold transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Generate Room Code"}
          </button>

        ) : (

          <div className="mt-10">

            <div className="bg-slate-800 rounded-xl p-8 flex justify-between items-center border border-slate-700">

              <span className="text-5xl tracking-widest font-bold">
                {roomCode}
              </span>

              <button
                onClick={copyCode}
                className="hover:text-blue-400 transition"
              >
                <Copy size={30} />
              </button>

            </div>

            <button
              className="mt-8 w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl text-xl font-semibold transition"
            >
              Continue →
            </button>

          </div>

        )}

      </div>

    </div>
  );
}
