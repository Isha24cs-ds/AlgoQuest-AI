import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  PlayCircle,
  Brain,
  Swords,
  Crown,
  Coins,
  Heart,
  Award,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function LinkedListTrack() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Learn Linked Lists",
      subtitle: "Pointer mechanics, node structures & memory layout",
      icon: BookOpen,
      route: "/learn-linkedlist",
      color: "bg-cyan-50 text-cyan-600 border-cyan-200",
    },
    {
      title: "Practice Missions",
      subtitle: "Solve 30 curated linked list coding challenges",
      icon: PlayCircle,
      route: "/linkedlist-practice",
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
    {
      title: "Interactive Quiz",
      subtitle: "Test cycle detection & pointer manipulation knowledge",
      icon: Brain,
      route: "/quiz",
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      title: "Mini Boss Challenge",
      subtitle: "Fast & slow pointers, reversing & merge problems",
      icon: Swords,
      route: "/miniboss",
      color: "bg-amber-50 text-amber-600 border-amber-200",
    },
    {
      title: "Final Boss Assessment",
      subtitle: "LRU cache & complex list algorithm problem set",
      icon: Crown,
      route: "/finalboss",
      color: "bg-rose-50 text-rose-600 border-rose-200",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10 w-full">
        {/* Header */}
        <div className="leetcode-panel rounded-xl p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 mb-3">
                <Sparkles size={13} />
                <span>Track 04 • Data Structures</span>
              </div>
              <h1 className="font-heading text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Linked Lists Track
              </h1>
              <p className="text-slate-600 text-sm mt-1 font-medium">
                Master node links, fast/slow pointer traversals, cycle detection, and memory allocation.
              </p>
            </div>

            {/* Stats Pills */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="leetcode-card px-4 py-2.5 rounded-lg flex items-center gap-2">
                <Coins className="text-amber-500" size={18} />
                <div className="text-left">
                  <span className="block text-xs font-bold text-slate-900">300 XP</span>
                  <span className="block text-[10px] text-slate-400 font-semibold">Coins</span>
                </div>
              </div>

              <div className="leetcode-card px-4 py-2.5 rounded-lg flex items-center gap-2">
                <Heart className="text-rose-500 fill-rose-500" size={18} />
                <div className="text-left">
                  <span className="block text-xs font-bold text-slate-900">3 / 3</span>
                  <span className="block text-[10px] text-slate-400 font-semibold">Hints Left</span>
                </div>
              </div>

              <div className="leetcode-card px-4 py-2.5 rounded-lg flex items-center gap-2">
                <Award className="text-cyan-600" size={18} />
                <div className="text-left">
                  <span className="block text-xs font-bold text-slate-900">0 / 5</span>
                  <span className="block text-[10px] text-slate-400 font-semibold">Modules Solved</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Mentor Callout */}
        <div className="rounded-xl border border-cyan-300 bg-cyan-50/80 p-6 mb-8 shadow-xs flex items-start gap-4">
          <div className="h-10 w-10 rounded-lg bg-cyan-600 text-white font-bold flex items-center justify-center shrink-0">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="font-heading text-lg font-bold text-slate-900">
              Nova AI Mentor
            </h2>
            <p className="text-xs leading-relaxed text-slate-700 mt-1 font-medium">
              Welcome to Linked Lists! Pointer manipulation can be tricky — remember to visualize pointer re-assignments carefully. Ask Nova for real-time guidance whenever you need help!
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <button
                key={card.title}
                onClick={() => navigate(card.route)}
                className="leetcode-card rounded-xl p-6 text-left border border-slate-200 bg-white hover:border-cyan-500/50 transition-all flex flex-col justify-between h-48 group"
              >
                <div>
                  <div className={`h-11 w-11 rounded-lg border flex items-center justify-center ${card.color}`}>
                    <Icon size={20} />
                  </div>

                  <h3 className="font-heading text-lg font-bold mt-4 text-slate-900 group-hover:text-cyan-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    {card.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-cyan-600">
                  <span>Start Module</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
