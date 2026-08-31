import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, LogIn, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const battleNames: Record<string, string> = {
  dsa: "DSA Battle",
  development: "Development Battle",
  aiml: "AI / ML Battle",
  core: "Core CS Battle",
};

export default function JoinRoom() {
  const navigate = useNavigate();
  const { battleType } = useParams();
  const { requireAuth, token, user } = useAuth();

  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);

  const battleName =
    battleNames[battleType || ""] || "Arena Battle";

  async function joinRoom() {
    if (!roomCode.trim()) {
      alert("Please enter a room code");
      return;
    }

    requireAuth(async () => {
      try {
        setLoading(true);

        const userName = user?.name || "Joining Player";
        const userEmail = user?.email || "joining@questai.io";

        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(
          "http://localhost:5000/api/v1/arena/join",
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              roomCode: roomCode.trim().toUpperCase(),
              userName,
              userEmail,
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
    });
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="mx-auto max-w-2xl px-6 py-10 w-full">
        <button
          onClick={() => navigate(`/arena/room/${battleType}`)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-6 transition"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div className="leetcode-panel rounded-2xl p-8 sm:p-10 border border-slate-200 bg-white shadow-xs">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
            {battleName}
          </span>

          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Join Arena Room
          </h1>

          <p className="text-xs text-slate-600 mt-1 font-medium">
            Enter the 6-character room code provided by your host.
          </p>

          <input
            type="text"
            value={roomCode}
            onChange={(e) =>
              setRoomCode(e.target.value.toUpperCase())
            }
            maxLength={6}
            placeholder="ENTER CODE"
            className="w-full mt-8 bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-center text-3xl font-extrabold font-mono tracking-[0.3em] uppercase text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition"
          />

          <button
            onClick={joinRoom}
            disabled={loading}
            className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-xs"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
            <span>{loading ? "Joining Room..." : "Join Arena Room"}</span>
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}