import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { API_BASE_URL } from "../../config";
import { Users, Swords, CheckCircle2, Copy, Shield, ArrowLeft, Loader2 } from "lucide-react";
import ArenaLiveChat from "../../components/Arena/ArenaLiveChat";
import { getSocket } from "../../services/socket";

interface DatabasePlayer {
  id: number;
  userId: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  joinedAt: string;
}

export default function WaitingLobby() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const codeFromParams = params.roomCode;
  const codeFromState = location.state?.room?.roomCode;
  const roomCode = (codeFromParams || codeFromState || "DSA888").toUpperCase();

  const [copied, setCopied] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [loadingLobby, setLoadingLobby] = useState(true);
  const [players, setPlayers] = useState<DatabasePlayer[]>([]);
  const [topic, setTopic] = useState("DSA");

  useEffect(() => {
    async function fetchLobbyFromDatabase() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/arena/lobby/${roomCode}`
        );

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.room) {
            setPlayers(data.room.players || []);
            setTopic(data.room.topic || "DSA");
          }
        }
      } catch (err) {
        console.error("Failed to fetch Postgres database lobby:", err);
      } finally {
        setLoadingLobby(false);
      }
    }

    fetchLobbyFromDatabase();
    const interval = setInterval(fetchLobbyFromDatabase, 3000);
    return () => clearInterval(interval);
  }, [roomCode]);

  // Listen for socket battle_started event so all competitors auto-navigate
  useEffect(() => {
    const socket = getSocket();
    function handleBattleStarted(data: { roomCode: string; slug: string }) {
      if (data.roomCode?.toUpperCase() === roomCode.toUpperCase()) {
        setIsStarting(true);
        sessionStorage.setItem("activeArenaRoom", roomCode);
        setTimeout(() => {
          navigate(`/question/${data.slug || "two-sum"}?room=${roomCode}`, {
            state: { roomCode, isArena: true },
          });
        }, 1200);
      }
    }

    socket.on("battle_started", handleBattleStarted);
    return () => {
      socket.off("battle_started", handleBattleStarted);
    };
  }, [roomCode, navigate]);

  function copyRoomCode() {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleStartBattle() {
    setIsStarting(true);
    sessionStorage.setItem("activeArenaRoom", roomCode);

    const socket = getSocket();
    socket.emit("start_battle", { roomCode, slug: "two-sum" });

    setTimeout(() => {
      navigate(`/question/two-sum?room=${roomCode}`, {
        state: { roomCode, isArena: true },
      });
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 w-full flex-1 flex flex-col justify-center">
        <button
          onClick={() => navigate("/arena")}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-4 self-start transition cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Exit Arena</span>
        </button>

        {/* Top Info Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase mb-2">
              <Swords size={13} />
              <span>Live Battle Waiting Lobby</span>
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
              {topic} Algorithmic Battle
            </h1>

            <p className="text-xs text-slate-500 font-medium mt-1">
              Synchronized real-time lobby with live competitive chat & database roster.
            </p>
          </div>

          {/* Room Code Card */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center justify-between gap-4 shrink-0">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Lobby Code
              </span>
              <span className="text-2xl font-extrabold tracking-[0.2em] font-mono text-blue-600">
                {roomCode}
              </span>
            </div>

            <button
              onClick={copyRoomCode}
              className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition shadow-xs flex items-center gap-1.5 text-xs font-bold cursor-pointer"
              title="Copy Room Code"
            >
              <Copy size={16} />
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* Main 2-Column Grid: Left Roster & Controls, Right Live Chat */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (Players & Match Actions) */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Users size={16} className="text-blue-600" />
                  <span>Connected Players ({players.length})</span>
                </h2>

                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  PostgreSQL Active
                </span>
              </div>

              {loadingLobby ? (
                <div className="flex items-center justify-center p-8 gap-2 text-xs font-semibold text-slate-500">
                  <Loader2 size={16} className="animate-spin text-blue-600" />
                  <span>Fetching real players from database...</span>
                </div>
              ) : (
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {players.map((p, idx) => (
                    <div
                      key={p.id || idx}
                      className="rounded-xl p-3.5 flex items-center justify-between border border-slate-200 bg-slate-50/70 hover:bg-white transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm shadow-xs">
                          {(p.user?.name || "Player").charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-heading text-sm font-bold text-slate-900">
                              {p.user?.name || "Real Player"}
                            </span>
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded">
                              {idx === 0 ? "Host" : "Competitor"}
                            </span>
                          </div>
                          <span className="text-xs text-slate-400 font-medium">
                            {p.user?.email || "player@questai.io"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                          <CheckCircle2 size={13} />
                          Connected
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Match Settings Banner */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
              <Shield size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 font-medium">
                <span className="font-bold block">Synchronized Battle Arena:</span>
                Messages and match telemetry sync live between all competitors in this lobby and inside the question arena.
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleStartBattle}
              disabled={isStarting}
              className="w-full bg-rose-600 hover:bg-rose-700 disabled:bg-rose-400 text-white font-bold py-4 rounded-xl text-xs sm:text-sm transition shadow-md flex items-center justify-center gap-2.5 cursor-pointer"
            >
              {isStarting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Launching Battle Arena For All Players...</span>
                </>
              ) : (
                <>
                  <Swords size={18} />
                  <span>Start Competitive Battle Now</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Live Chat Panel */}
          <div className="lg:col-span-6">
            <ArenaLiveChat
              roomCode={roomCode}
              mode="embedded"
              className="h-[480px] w-full"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

