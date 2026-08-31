import { useNavigate } from "react-router-dom";
import WorldNode from "../../components/dsa/WorldNode";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Sparkles, Search, Filter } from "lucide-react";

const worlds = [
  {
    title: "Programming Fundamentals",
    icon: "📦",
    unlocked: true,
    current: false,
    difficulty: "Easy",
    problemCount: 39,
    route: "/variables",
  },
  {
    title: "Arrays",
    icon: "📊",
    unlocked: true,
    current: true,
    difficulty: "Easy",
    problemCount: 25,
    route: "/arrays",
  },
  {
    title: "Strings",
    icon: "🔤",
    unlocked: true,
    current: false,
    difficulty: "Easy",
    problemCount: 20,
    route: "/strings",
  },
  {
    title: "Linked Lists",
    icon: "🔗",
    unlocked: true,
    current: false,
    difficulty: "Medium",
    problemCount: 18,
    route: "/linkedlist",
  },
  {
    title: "Stacks",
    icon: "📚",
    unlocked: true,
    current: false,
    difficulty: "Medium",
    problemCount: 15,
    route: "/stack",
  },
  {
    title: "Queues",
    icon: "⏳",
    unlocked: true,
    current: false,
    difficulty: "Medium",
    problemCount: 14,
    route: "/queue",
  },
  {
    title: "Trees",
    icon: "🌿",
    unlocked: false,
    current: false,
    difficulty: "Hard",
    problemCount: 30,
    route: "/tree",
  },
  {
    title: "Graphs",
    icon: "🌐",
    unlocked: false,
    current: false,
    difficulty: "Hard",
    problemCount: 28,
    route: "/graph",
  },
];

function DSAHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-xs font-bold text-amber-800 uppercase tracking-wide">
            <Sparkles size={14} className="text-amber-600 fill-amber-500" />
            <span>Problemset Curricula</span>
          </div>

          <h1 className="font-heading text-3xl font-extrabold sm:text-5xl tracking-tight text-slate-900">
            Data Structures & Algorithms
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            Solve curated interactive modules, master key data structure patterns, and prepare for top tier coding interviews.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="leetcode-panel rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search problem modules..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-1">
              <Filter size={14} />
              Filter:
            </span>
            <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white shadow-xs">
              All Modules
            </button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition">
              Easy
            </button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition">
              Medium
            </button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition">
              Hard
            </button>
          </div>
        </div>

        {/* Worlds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {worlds.map((world) => (
            <WorldNode
              key={world.title}
              {...world}
              onClick={() => navigate(world.route)}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default DSAHome;