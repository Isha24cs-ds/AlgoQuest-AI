import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JoinRoom() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function joinRoom() {
    if (!code.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/arena/join",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomCode: code.toUpperCase(),
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
      } else {
        alert("Joined room " + data.room.roomCode);

        navigate("/arena/lobby", {
          state: {
            room: data.room,
          },
        });
      }

    } catch (err) {
      console.error(err);
      alert("Failed to join room");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">

      <div className="bg-slate-900 rounded-3xl p-10 w-[600px] border border-slate-800">

        <h1 className="text-4xl font-bold">
          Join Arena
        </h1>

        <p className="text-slate-400 mt-3">
          Enter the 6-character room code shared by your friend.
        </p>

        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="ENTER CODE"
          maxLength={6}
          className="w-full mt-10 p-5 rounded-xl bg-slate-800 text-3xl tracking-widest text-center outline-none border border-slate-700 focus:border-blue-500"
        />

        <button
          onClick={joinRoom}
          disabled={loading}
          className="w-full mt-8 bg-green-600 hover:bg-green-700 py-4 rounded-xl text-xl font-semibold transition disabled:opacity-50"
        >
          {loading ? "Joining..." : "Join Room"}
        </button>

      </div>

    </div>
  );
}
