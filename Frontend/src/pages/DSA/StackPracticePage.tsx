import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { stackPracticeQuestions, type QuestionItem } from "../../data/stackPracticeQuestions";
import { Code2, ArrowRight, Sparkles, Search, Filter } from "lucide-react";

export default function StackPracticePage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("All");

  const filteredQuestions = useMemo(() => {
    return stackPracticeQuestions.filter((q) => {
      const matchesSearch =
        q.title.toLowerCase().includes(search.toLowerCase()) ||
        q.topic.toLowerCase().includes(search.toLowerCase());

      const matchesDifficulty =
        filterDifficulty === "All" || q.difficulty === filterDifficulty;

      return matchesSearch && matchesDifficulty;
    });
  }, [search, filterDifficulty]);

  const countEasy = stackPracticeQuestions.filter((q) => q.difficulty === "Easy").length;
  const countMedium = stackPracticeQuestions.filter((q) => q.difficulty === "Medium").length;
  const countHard = stackPracticeQuestions.filter((q) => q.difficulty === "Hard").length;

  const getBadgeStyle = (diff: string) => {
    switch (diff) {
      case "Easy":
        return "text-emerald-700 bg-emerald-50 border-emerald-200";
      case "Medium":
        return "text-amber-700 bg-amber-50 border-amber-200";
      case "Hard":
        return "text-rose-700 bg-rose-50 border-rose-200";
      default:
        return "text-slate-700 bg-slate-50 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10 w-full flex-1">
        {/* Header Panel */}
        <div className="leetcode-panel rounded-xl p-8 mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700 mb-3">
            <Sparkles size={13} />
            <span>Curated Practice Missions</span>
          </div>

          <h1 className="font-heading text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Stack Practice Missions
          </h1>

          <p className="text-slate-600 text-sm mt-1 font-medium max-w-2xl">
            Solve 30 curated Stack interview problems covering LIFO operations, bracket validation, Min-Stack, monotonic stacks, and expression parsing.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="leetcode-panel rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search problems by name or topic..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white transition"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-1">
              <Filter size={14} />
              Filter:
            </span>
            <button
              onClick={() => setFilterDifficulty("All")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                filterDifficulty === "All"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All ({stackPracticeQuestions.length})
            </button>
            <button
              onClick={() => setFilterDifficulty("Easy")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
                filterDifficulty === "Easy"
                  ? "bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
              }`}
            >
              Easy ({countEasy})
            </button>
            <button
              onClick={() => setFilterDifficulty("Medium")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
                filterDifficulty === "Medium"
                  ? "bg-amber-500 text-slate-950 border-amber-500 font-bold shadow-xs"
                  : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
              }`}
            >
              Medium ({countMedium})
            </button>
            <button
              onClick={() => setFilterDifficulty("Hard")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
                filterDifficulty === "Hard"
                  ? "bg-rose-600 text-white border-rose-600 font-bold shadow-xs"
                  : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
              }`}
            >
              Hard ({countHard})
            </button>
          </div>
        </div>

        {/* Question List */}
        <div className="space-y-3.5">
          {filteredQuestions.map((question: QuestionItem) => (
            <div
              key={question.id}
              className="leetcode-card rounded-xl p-5 border border-slate-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs hover:border-purple-500/50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center shrink-0">
                  <Code2 size={20} />
                </div>

                <div>
                  <h3 className="font-heading text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                    {question.title}
                  </h3>

                  <div className="flex items-center gap-3 mt-1 text-xs">
                    <span className={`font-semibold border px-2.5 py-0.5 rounded-md ${getBadgeStyle(question.difficulty)}`}>
                      {question.difficulty}
                    </span>
                    <span className="text-slate-500 font-medium">
                      Topic: {question.topic}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate(`/question/${question.slug}`)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs group-hover:shadow-sm"
              >
                <span>Solve Problem</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}

          {filteredQuestions.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl border border-slate-200 text-slate-500 font-medium text-sm">
              No matching practice problems found.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
