import { useLocation } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Users, Swords, CheckCircle2 } from "lucide-react";

export default function WaitingLobby() {
  const location = useLocation();
  const room = location.state?.room;

  if (!room) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
        <Navbar />
        <main className="flex items-center justify-center p-20 flex-1">
          <div className="leetcode-panel p-8 rounded-xl border border-slate-200 bg-white text-center max-w-md w-full shadow-xs">
            <h1 className="font-heading text-xl font-bold text-slate-900">No Room Found</h1>
            <p className="text-xs text-slate-500 mt-2 font-medium">
              Join or create a room first.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 py-10 w-full flex-1 flex items-center justify-center">
        <div className="leetcode-panel rounded-2xl p-8 sm:p-10 w-full border border-slate-200 bg-white shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase mb-2">
                <Swords size={13} />
                <span>Live Battle Lobby</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
                Waiting Lobby
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Waiting for competitors to join...
              </p>
            </div>

            <div className="sm:text-right bg-slate-50 border border-slate-200 p-3 rounded-xl">
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Room Code
              </p>
              <p className="text-2xl font-extrabold tracking-widest font-mono text-blue-600">
                {room.roomCode}
              </p>
            </div>
          </div>

          <div className="my-6 space-y-3">
            <div className="leetcode-card rounded-xl p-4 flex items-center justify-between border border-slate-200 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                  <Users size={18} />
                </div>
                <div>
                  <span className="font-heading text-sm font-bold text-slate-900 block">
                    Host (You)
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">Ready in lobby</span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                <CheckCircle2 size={13} />
                Ready
              </span>
            </div>
          </div>

          <button
            className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3.5 rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-2"
          >
            <Swords size={16} />
            <span>Start Battle</span>
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

