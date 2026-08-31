import {
  Trophy,
  ArrowRight,
  Swords,
  Users,
  Shield,
  Zap,
  Clock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function JourneySelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-12 w-full flex-1">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-xs font-bold text-amber-800 uppercase tracking-wide">
            <Sparkles size={14} className="text-amber-600 fill-amber-500" />
            <span>Curriculum Track</span>
          </div>

          <h1 className="font-heading text-3xl font-extrabold sm:text-5xl tracking-tight text-slate-900">
            Select Your Learning Path
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            Accelerate your software engineering interview preparation with interactive visualizers and AI mentorship.
          </p>
        </div>

        {/* Featured Placement Preparation Card */}
        <div className="leetcode-card rounded-2xl p-8 sm:p-10 border border-slate-200 bg-white shadow-sm hover:border-amber-400/60 transition-all mb-10 group">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <div className="h-14 w-14 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
                  <Trophy size={28} />
                </div>
                <span className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200 text-amber-800">
                  Most Popular • Primary Track
                </span>
              </div>

              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  Placement Preparation
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                  Data Structures, Algorithms, Aptitude & Technical Interview Modules
                </p>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                Master essential algorithms, dynamic programming patterns, array manipulation, tree traversals, and problem-solving techniques tailored specifically for top tier software engineering interviews.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>250+ Problems</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Interactive Modules</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 col-span-2 sm:col-span-1">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Nova AI Guidance</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col justify-center">
              <button
                onClick={() => navigate("/dsa")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 px-8 py-4 text-sm font-bold text-slate-950 shadow-xs border border-amber-400 transition-all group-hover:shadow-md"
              >
                <span>Enter Placement Track</span>
                <ArrowRight size={18} className="stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Competitive Arena Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-blue-500/10 border border-amber-300/80 p-8 sm:p-9 shadow-xs">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3.5 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-500 text-slate-950 font-bold border border-amber-400">
                  <Swords size={22} className="stroke-[2.5]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-heading text-2xl font-bold text-slate-900">
                      Competitive Coding Arena
                    </h2>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-600 animate-pulse"></span>
                      LIVE CONTEST
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    Challenge engineers in real-time 1v1 or multiplayer algorithmic sprint battles.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs">
                  <Users size={14} className="text-amber-600" />
                  <span>Create / Join Rooms</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs">
                  <Shield size={14} className="text-blue-600" />
                  <span>Rated Matchmaking</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs">
                  <Clock size={14} className="text-emerald-600" />
                  <span>20-Min Contests</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs">
                  <Zap size={14} className="text-orange-600" />
                  <span>Real-time Judgement</span>
                </span>
              </div>
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={() => navigate("/arena")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 px-6 py-3.5 text-sm font-bold text-white shadow-xs transition-all"
              >
                <span>Enter Arena</span>
                <ArrowRight size={16} className="stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
