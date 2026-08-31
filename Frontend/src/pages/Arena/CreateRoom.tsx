import { useNavigate, useParams } from "react-router-dom";
import { Copy, ArrowLeft, Loader2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const battleNames: Record<string, string> = {
  dsa: "DSA Battle",
  development: "Development Battle",
  aiml: "AI / ML Battle",
  core: "Core CS Battle",
};

export default function CreateRoom() {
  const navigate = useNavigate();
  const { battleType } = useParams();
  const { requireAuth, token, user } = useAuth();

  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);

  const battleName =
    battleNames[battleType || ""] || "Arena Battle";

  async function createRoom() {
    requireAuth(async () => {
      try {
        setLoading(true);

        const userName = user?.name || "Logged-in Host";
        const userEmail = user?.email || "host@questai.io";

        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(
          "http://localhost:5000/api/v1/arena/create",
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              battleType,
              userName,
              userEmail,
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
    });
  }

  function copyCode() {
    navigator.clipboard.writeText(roomCode);
    alert("Room code copied!");
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
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
            {battleName}
          </span>

          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Create Arena Room
          </h1>

          <p className="text-xs text-slate-600 mt-1 font-medium">
            Generate a 6-character room code and share it with your competitive peers.
          </p>

          {!roomCode ? (
            <button
              onClick={createRoom}
              disabled={loading}
              className="w-full mt-8 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3.5 rounded-xl text-xs transition shadow-xs flex items-center justify-center gap-2 border border-amber-400"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              <span>{loading ? "Generating Code..." : "Generate Room Code"}</span>
            </button>
          ) : (
            <>
              <div className="mt-8">
                <p className="text-xs font-semibold text-slate-500 mb-2">
                  Share this 6-character code with your friends:
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-center justify-between">
                  <span className="text-3xl font-extrabold font-mono tracking-[0.3em] text-slate-900">
                    {roomCode}
                  </span>

                  <button
                    onClick={copyCode}
                    className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition shadow-xs"
                    title="Copy Room Code"
                  >
                    <Copy size={18} />
                  </button>
                </div>
              </div>

              <button
                onClick={() =>
                  navigate(`/arena/lobby/${roomCode}`)
                }
                className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-xs transition shadow-xs flex items-center justify-center gap-2"
              >
                <span>Enter Waiting Lobby</span>
                <ArrowRight size={14} />
              </button>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}