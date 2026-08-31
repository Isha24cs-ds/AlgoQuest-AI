import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  Swords,
  Brain,
  Users,
  ArrowRight,
  Shield,
  Zap,
  Clock,
} from "lucide-react";

export default function ArenaHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-12 w-full flex-1">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1 text-xs font-bold text-rose-700 uppercase tracking-wide">
            <Swords size={14} className="text-rose-600 stroke-[2.5]" />
            <span>Competitive Contests</span>
          </div>

          <h1 className="font-heading text-3xl font-extrabold sm:text-5xl tracking-tight text-slate-900">
            Real-Time Coding Arena
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            Create private coding rooms, challenge peers live, and compete in real-time algorithmic battles.
          </p>
        </div>

        {/* Featured DSA Battle Card */}
        <div className="leetcode-card rounded-2xl p-8 sm:p-10 border border-slate-200 bg-white shadow-sm hover:border-rose-400/60 transition-all mb-10 group">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <div className="h-14 w-14 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
                  <Brain size={28} />
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-rose-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-600 animate-pulse"></span>
                  Live Contest • DSA Track
                </span>
              </div>

              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                  DSA Algorithmic Battle
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                  Compete live in Arrays, Strings, Trees, Graphs, and Dynamic Programming problem sets
                </p>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                Test your problem-solving speed and code execution under pressure. Join or create a private room to compete against friends or match with rated peers globally.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700">
                  <Users size={14} className="text-rose-600" />
                  <span>Private & Multiplayer Rooms</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700">
                  <Shield size={14} className="text-blue-600" />
                  <span>Rated Leaderboard</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700">
                  <Clock size={14} className="text-emerald-600" />
                  <span>20-Min Contests</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700">
                  <Zap size={14} className="text-amber-600" />
                  <span>Instant Judgement</span>
                </span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col justify-center">
              <button
                onClick={() => navigate("/arena/room/dsa")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-700 px-8 py-4 text-sm font-bold text-white shadow-xs transition-all group-hover:shadow-md"
              >
                <span>Create / Join Room</span>
                <ArrowRight size={18} className="stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
