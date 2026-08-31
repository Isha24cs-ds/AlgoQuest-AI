import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import WorldNode from "../../components/dsa/WorldNode";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Sparkles, Search, Filter, Target, BrainCircuit, ArrowRight, Activity, Award, Lock } from "lucide-react";


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

interface ProgressData {
  overall: number;
  topics: Record<string, number>;
  solved: number;
  attempted: number;
  totalQuestions?: number;
}


interface MasteryData {
  overallMastery: number;
  topics: Record<string, { score: number; attempts: number }>;
}

interface RecommendationData {
  recommendation: {
    topic: string;
    pattern: string;
    difficulty: string;
    reason: string;
  };
  question: {
    id: number;
    title: string;
    slug: string;
  };
}

function DSAHome() {
  const navigate = useNavigate();
  const { isAuthenticated, token, requireAuth, openAuthModal } = useAuth();

  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [mastery, setMastery] = useState<MasteryData | null>(null);
  const [recommendation, setRecommendation] = useState<RecommendationData | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      if (!isAuthenticated || !token) {
        setProgress(null);
        setMastery(null);
        setRecommendation(null);
        return;
      }

      try {
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };


        const [progRes, masteryRes, recRes] = await Promise.all([
          fetch("http://localhost:5000/api/v1/progress", { headers }),
          fetch("http://localhost:5000/api/v1/adaptive/mastery", { headers }),
          fetch("http://localhost:5000/api/v1/adaptive/next-question", { headers }),
        ]);

        if (progRes.ok) {
          const pData = await progRes.json();
          setProgress(pData.progress);
        }

        if (masteryRes.ok) {
          const mData = await masteryRes.json();
          setMastery(mData.data);
        }

        if (recRes.ok) {
          const rData = await recRes.json();
          setRecommendation(rData);
        }
      } catch (err) {
        console.error("Error fetching user DSA progress:", err);
      }
    }

    fetchUserData();
  }, [isAuthenticated, token]);


  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12 w-full space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-xs font-bold text-amber-800 uppercase tracking-wide">
            <Sparkles size={14} className="text-amber-600 fill-amber-500" />
            <span>Problemset Curricula & Adaptive Learning</span>
          </div>

          <h1 className="font-heading text-3xl font-extrabold sm:text-5xl tracking-tight text-slate-900">
            Data Structures & Algorithms
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            Solve curated interactive modules, master key data structure patterns, and let AI adaptively tailor your practice path.
          </p>
        </div>

        {/* ADAPTIVE LEARNING DASHBOARD SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* YOUR DSA PROGRESS CARD */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Activity size={18} className="text-amber-600" />
                  <h2 className="font-heading text-base font-extrabold text-slate-900 uppercase tracking-wide">
                    Your DSA Progress
                  </h2>
                </div>

                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
                  <Award size={14} className="text-amber-600" />
                  <span>
                    Overall Mastery: {mastery ? `${mastery.overallMastery}%` : "0%"}{" "}
                    {progress?.totalQuestions ? `(${progress.solved}/${progress.totalQuestions} Solved)` : ""}
                  </span>
                </div>

              </div>


              {!isAuthenticated && (
                <div className="mb-4 bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 flex items-center justify-between text-xs text-amber-900">
                  <div className="flex items-center gap-2">
                    <Lock size={15} className="text-amber-600 shrink-0" />
                    <span>Log in to track your individual DSA progress and save problem submissions.</span>
                  </div>
                  <button
                    onClick={() => openAuthModal()}
                    className="ml-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded-lg text-xs shrink-0 transition"
                  >
                    Log In
                  </button>
                </div>
              )}

              {/* Topic Bars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-xs">
                {[
                  { name: "Arrays", key: "Arrays" },
                  { name: "Strings", key: "Strings" },
                  { name: "Stacks", key: "Stack" },
                  { name: "Queues", key: "Queue" },
                  { name: "Linked Lists", key: "Linked List" },
                  { name: "Trees", key: "Trees" },
                  { name: "Graphs", key: "Graphs" },
                ].map((item) => {
                  const score = isAuthenticated ? (mastery?.topics?.[item.key]?.score ?? 0) : 0;
                  const attempts = isAuthenticated ? (mastery?.topics?.[item.key]?.attempts ?? 0) : 0;
                  return (
                    <div key={item.name} className="space-y-1">
                      <div className="flex justify-between font-semibold text-slate-700">
                        <span>{item.name}</span>
                        <span className="font-mono text-slate-900 font-bold">
                          {attempts > 0 ? `${score}%` : "0% (Not Attempted)"}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            score >= 75
                              ? "bg-emerald-500"
                              : score >= 50
                              ? "bg-amber-500"
                              : score > 0
                              ? "bg-rose-500"
                              : "bg-slate-300"
                          }`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* RECOMMENDED FOR YOU CARD */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-4">
                <Target size={18} className="text-amber-400" />
                <h2 className="font-heading text-base font-extrabold uppercase tracking-wide text-amber-400">
                  Recommended For You
                </h2>
              </div>

              {recommendation && isAuthenticated ? (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                      <span className="text-slate-400 font-medium block text-[11px]">Weak Area</span>
                      <span className="font-bold text-slate-100 text-sm mt-0.5 block">
                        {recommendation.recommendation.topic}
                      </span>
                    </div>

                    <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                      <span className="text-slate-400 font-medium block text-[11px]">Recommended Pattern</span>
                      <span className="font-bold text-amber-400 text-sm mt-0.5 block">
                        {recommendation.recommendation.pattern}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-slate-800/50 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 font-medium">Difficulty Level:</span>
                    <span className="px-2.5 py-0.5 rounded-full font-bold text-[11px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {recommendation.recommendation.difficulty}
                    </span>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-amber-200 leading-relaxed font-medium">
                    💡 <span className="font-semibold text-amber-300">Reason:</span> {recommendation.recommendation.reason}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-400 space-y-2 py-4">
                  <BrainCircuit className="h-8 w-8 text-amber-400 animate-pulse" />
                  <p>
                    {isAuthenticated
                      ? "Analyzing problem history and identifying weak patterns..."
                      : "Log in to activate your AI-driven adaptive recommendations."}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                requireAuth(() => {
                  if (recommendation?.question?.slug) {
                    navigate(`/question/${recommendation.question.slug}`);
                  } else {
                    navigate("/arrays");
                  }
                });
              }}
              className="mt-6 w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-md hover:scale-[1.02]"
            >
              <span>Start Recommended Problem</span>
              <ArrowRight size={14} />
            </button>
          </div>
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