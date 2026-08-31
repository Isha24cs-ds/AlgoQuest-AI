import {
  BookOpen,
  Sword,
  Brain,
  Shield,
  Crown,
  Coins,
  Sparkles,
  Award,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function StringsKingdom() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Learn Strings",
      description: "Text processing, ASCII, & String immutability",
      icon: BookOpen,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
      route: "/learn-strings",
    },
    {
      title: "Practice Missions",
      description: "Solve string matching & manipulation challenges",
      icon: Sword,
      color: "bg-blue-50 text-blue-600 border-blue-200",
      route: "/strings-practice",
    },
    {
      title: "Interactive Quiz",
      description: "Test string search & complexity knowledge",
      icon: Brain,
      color: "bg-purple-50 text-purple-600 border-purple-200",
      route: "/strings-quiz",
    },
    {
      title: "Mini Boss Challenge",
      description: "Anagrams & Palindrome substring algorithms",
      icon: Shield,
      color: "bg-amber-50 text-amber-600 border-amber-200",
      route: "/strings-mini-boss",
    },
    {
      title: "Final Boss Assessment",
      description: "Advanced KMP & Trie string matching",
      icon: Crown,
      color: "bg-rose-50 text-rose-600 border-rose-200",
      route: "/strings-final-boss",
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
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 mb-3">
                <Sparkles size={13} />
                <span>Track 03 • Data Structures</span>
              </div>
              <h1 className="font-heading text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Strings Track
              </h1>
              <p className="text-slate-600 text-sm mt-1 font-medium">
                Master text processing, pattern matching, substring search algorithms, and character arrays.
              </p>
            </div>

            {/* Stats Pills */}
            <div className="flex items-center gap-3">
              <div className="leetcode-card px-4 py-2.5 rounded-lg flex items-center gap-2">
                <Coins className="text-amber-500" size={18} />
                <div className="text-left">
                  <span className="block text-xs font-bold text-slate-900">200 XP</span>
                  <span className="block text-[10px] text-slate-400 font-semibold">Coins</span>
                </div>
              </div>

              <div className="leetcode-card px-4 py-2.5 rounded-lg flex items-center gap-2">
                <Award className="text-emerald-600" size={18} />
                <div className="text-left">
                  <span className="block text-xs font-bold text-slate-900">Level 1</span>
                  <span className="block text-[10px] text-slate-400 font-semibold">Rank</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Mentor Callout */}
        <div className="rounded-xl border border-emerald-300 bg-emerald-50/80 p-6 mb-8 shadow-xs flex items-start gap-4">
          <div className="h-10 w-10 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="font-heading text-lg font-bold text-slate-900">
              Nova AI Mentor
            </h2>
            <p className="text-xs leading-relaxed text-slate-700 mt-1 font-medium">
              Welcome to the Strings Track! Here you'll learn how search engines, chat apps, and AI assistants manipulate text. Ask Nova for real-time hints anytime!
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
                className="leetcode-card rounded-xl p-6 text-left border border-slate-200 bg-white hover:border-emerald-500/50 transition-all flex flex-col justify-between h-48 group"
              >
                <div>
                  <div className={`h-11 w-11 rounded-lg border flex items-center justify-center ${card.color}`}>
                    <Icon size={20} />
                  </div>

                  <h3 className="font-heading text-lg font-bold mt-4 text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    {card.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
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