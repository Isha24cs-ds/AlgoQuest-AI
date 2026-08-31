import { useNavigate, useParams } from "react-router-dom";
import { PlusCircle, DoorOpen, ArrowLeft, ArrowRight, Swords } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

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
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-10 w-full">
        {/* Back */}
        <button
          onClick={() => navigate("/arena")}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-8 transition"
        >
          <ArrowLeft size={16} />
          <span>Back to Arena</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700 mb-3 uppercase">
            <Swords size={13} />
            <span>Room Management</span>
          </div>

          <h1 className="font-heading text-3xl font-extrabold text-slate-900 sm:text-4xl">
            {battleName}
          </h1>

          <p className="text-slate-600 text-sm mt-2 font-medium">
            Create a private competitive room or enter a friend's room code to battle live.
          </p>
        </div>

        {/* Options */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Create Room */}
          <div
            onClick={() => navigate(`/arena/create/${battleType}`)}
            className="leetcode-card cursor-pointer rounded-xl p-8 border border-slate-200 bg-white hover:border-blue-500/50 transition-all flex flex-col justify-between h-64 group shadow-xs"
          >
            <div>
              <div className="h-12 w-12 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <PlusCircle size={26} />
              </div>

              <h2 className="font-heading text-xl font-bold mt-5 text-slate-900 group-hover:text-blue-600 transition-colors">
                Create Private Room
              </h2>

              <p className="text-xs text-slate-600 mt-2 font-normal leading-relaxed">
                Generate a unique room code for {battleName} and invite your friends to compete.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
              <span>Generate Room Code</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Join Room */}
          <div
            onClick={() => navigate(`/arena/join/${battleType}`)}
            className="leetcode-card cursor-pointer rounded-xl p-8 border border-slate-200 bg-white hover:border-emerald-500/50 transition-all flex flex-col justify-between h-64 group shadow-xs"
          >
            <div>
              <div className="h-12 w-12 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <DoorOpen size={26} />
              </div>

              <h2 className="font-heading text-xl font-bold mt-5 text-slate-900 group-hover:text-emerald-600 transition-colors">
                Join Existing Room
              </h2>

              <p className="text-xs text-slate-600 mt-2 font-normal leading-relaxed">
                Enter your friend's room code to jump straight into the live battle lobby.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
              <span>Enter Room Code</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}