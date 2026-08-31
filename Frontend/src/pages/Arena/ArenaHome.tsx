import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  Swords,
  Brain,
  Code2,
  BookOpen,
  Cpu,
  Users,
  ArrowRight,
} from "lucide-react";

const battles = [
  {
    title: "DSA Battle",
    description:
      "Compete in Arrays, Strings, Trees, Graphs and algorithmic problem sets.",
    icon: Brain,
    color: "bg-amber-50 text-amber-600 border-amber-200",
    badge: "Popular",
    link: "/arena/room/dsa",
  },
  {
    title: "Development Battle",
    description:
      "React, Node.js, Express, SQL, Git, and full stack web challenges.",
    icon: Code2,
    color: "bg-blue-50 text-blue-600 border-blue-200",
    badge: "Web Track",
    link: "/arena/room/development",
  },
  {
    title: "AI / ML Battle",
    description:
      "Python, NumPy, PyTorch, ML pipelines & LLM engineering quizzes.",
    icon: Cpu,
    color: "bg-purple-50 text-purple-600 border-purple-200",
    badge: "AI Track",
    link: "/arena/room/aiml",
  },
  {
    title: "Core CS Battle",
    description:
      "Database Systems, Operating Systems, Networks & OOP competitive rooms.",
    icon: BookOpen,
    color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    badge: "Systems",
    link: "/arena/room/core",
  },
];

export default function ArenaHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1 text-xs font-bold text-rose-700 uppercase tracking-wide">
            <Swords size={14} className="text-rose-600" />
            <span>Competitive Contests</span>
          </div>

          <h1 className="font-heading text-3xl font-extrabold sm:text-5xl tracking-tight text-slate-900">
            Real-Time Coding Arena
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            Create private coding rooms, challenge peers live, and climb the global engineering leaderboard.
          </p>
        </div>

        {/* Battle Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {battles.map((battle) => {
            const Icon = battle.icon;

            return (
              <div
                key={battle.title}
                className="leetcode-card rounded-xl p-7 border border-slate-200 bg-white flex flex-col justify-between group hover:border-rose-400/60 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className={`h-11 w-11 rounded-lg border flex items-center justify-center ${battle.color}`}
                    >
                      <Icon size={22} />
                    </div>

                    <span className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                      {battle.badge}
                    </span>
                  </div>

                  <h2 className="font-heading text-xl font-bold mt-5 text-slate-900 group-hover:text-rose-600 transition-colors">
                    {battle.title}
                  </h2>

                  <p className="text-xs leading-relaxed text-slate-600 mt-2 font-normal">
                    {battle.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                    <Users size={14} className="text-slate-400" />
                    <span>Multiplayer / Private Room</span>
                  </span>

                  <button
                    onClick={() => navigate(battle.link)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Create / Join Room</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}