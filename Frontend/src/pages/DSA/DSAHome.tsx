import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";
import WorldNode from "../../components/dsa/WorldNode";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  Sparkles,
  Search,
  Filter,
  Target,
  BrainCircuit,
  ArrowRight,
  Activity,
  Award,
  Lock,
  CheckCircle2,
  FileCode2,
} from "lucide-react";

interface World {
  title: string;
  topicKey: string;
  icon: string;
  unlocked: boolean;
  current: boolean;
  difficulty: "Easy" | "Medium" | "Hard";
  problemCount: number;
  route: string;
}

const rawWorlds: World[] = [
  {
    title: "Programming Fundamentals",
    topicKey: "Variables",
    icon: "📦",
    unlocked: true,
    current: false,
    difficulty: "Easy",
    problemCount: 39,
    route: "/variables",
  },
  {
    title: "Arrays",
    topicKey: "Arrays",
    icon: "📊",
    unlocked: true,
    current: true,
    difficulty: "Easy",
    problemCount: 25,
    route: "/arrays",
  },
  {
    title: "Strings",
    topicKey: "Strings",
    icon: "🔤",
    unlocked: true,
    current: false,
    difficulty: "Easy",
    problemCount: 20,
    route: "/strings",
  },
  {
    title: "Linked Lists",
    topicKey: "Linked List",
    icon: "🔗",
    unlocked: true,
    current: false,
    difficulty: "Medium",
    problemCount: 18,
    route: "/linkedlist",
  },
  {
    title: "Stacks",
    topicKey: "Stack",
    icon: "📚",
    unlocked: true,
    current: false,
    difficulty: "Medium",
    problemCount: 15,
    route: "/stack",
  },
  {
    title: "Queues",
    topicKey: "Queue",
    icon: "⏳",
    unlocked: true,
    current: false,
    difficulty: "Medium",
    problemCount: 14,
    route: "/queue",
  },
  {
    title: "Trees",
    topicKey: "Trees",
    icon: "🌿",
    unlocked: false,
    current: false,
    difficulty: "Hard",
    problemCount: 30,
    route: "/tree",
  },
  {
    title: "Graphs",
    topicKey: "Graphs",
    icon: "🌐",
    unlocked: false,
    current: false,
    difficulty: "Hard",
    problemCount: 28,
    route: "/graph",
  },
];

interface TopicStat {
  name: string;
  solved: number;
  attempted: number;
  submitted: number;
  acceptedSubmissions: number;
  total: number;
  percentage: number;
  accuracy: number;
}

interface ProgressData {
  overall: number;
  topics: Record<string, number>;
  topicStats?: Record<string, TopicStat>;
  solved: number;
  attempted: number;
  submitted: number;
  totalQuestions: number;
  accuracy: number;
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
  const [loadingRec, setLoadingRec] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDiff, setFilterDiff] = useState<"All" | "Easy" | "Medium" | "Hard">("All");

  useEffect(() => {
    async function fetchUserData() {
      setLoadingRec(true);

      try {
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const requests: Promise<Response>[] = [
          fetch(`${API_BASE_URL}/adaptive/next-question`, { headers }),
        ];

        if (isAuthenticated && token) {
          requests.push(fetch(`${API_BASE_URL}/progress`, { headers }));
          requests.push(fetch(`${API_BASE_URL}/adaptive/mastery`, { headers }));
        }

        const responses = await Promise.all(requests);
        const recRes = responses[0];
        const progRes = responses[1];
        const masteryRes = responses[2];

        if (recRes && recRes.ok) {
          const rData = await recRes.json();
          if (rData && rData.success) {
            setRecommendation(rData);
          }
        }

        if (progRes && progRes.ok) {
          const pData = await progRes.json();
          if (pData && pData.progress) {
            setProgress(pData.progress);
          }
        } else if (!isAuthenticated) {
          setProgress(null);
        }

        if (masteryRes && masteryRes.ok) {
          const mData = await masteryRes.json();
          if (mData && mData.data) {
            setMastery(mData.data);
          }
        } else if (!isAuthenticated) {
          setMastery(null);
        }
      } catch (err) {
        console.error("Error fetching user DSA progress:", err);
      } finally {
        setLoadingRec(false);
      }
    }

    fetchUserData();
  }, [isAuthenticated, token]);

  const filteredWorlds = useMemo(() => {
    return rawWorlds.filter((w) => {
      const matchSearch = w.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDiff = filterDiff === "All" || w.difficulty === filterDiff;
      return matchSearch && matchDiff;
    });
  }, [searchTerm, filterDiff]);

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
            Solve curated interactive modules, master key data structure patterns, and track your live submission telemetry.
          </p>
        </div>

        {/* REAL DSA PROGRESS DASHBOARD SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* YOUR REAL DSA PROGRESS CARD */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-4 mb-4 gap-2">
                <div className="flex items-center gap-2">
                  <Activity size={18} className="text-amber-600" />
                  <h2 className="font-heading text-base font-extrabold text-slate-900 uppercase tracking-wide">
                    Your DSA Progress
                  </h2>
                </div>

                {isAuthenticated && progress ? (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
                      <CheckCircle2 size={13} className="text-emerald-600" />
                      <span>
                        {progress.solved}/{progress.totalQuestions || 189} Solved ({progress.overall}%)
                      </span>
                    </span>

                    <span className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">
                      <FileCode2 size={13} className="text-blue-600" />
                      <span>{progress.submitted || 0} Submissions</span>
                    </span>

                    <span className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
                      <Award size={13} className="text-amber-600" />
                      <span>{progress.accuracy || 0}% Accuracy</span>
                    </span>

                    {mastery && (
                      <span className="flex items-center gap-1.5 bg-purple-50 border border-purple-200 text-purple-800 px-3 py-1 rounded-full text-xs font-bold">
                        <Sparkles size={13} className="text-purple-600" />
                        <span>{mastery.overallMastery}% Mastery</span>
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">
                    <span>0/189 Solved</span>
                  </div>
                )}
              </div>

              {!isAuthenticated && (
                <div className="mb-4 bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 flex items-center justify-between text-xs text-amber-900">
                  <div className="flex items-center gap-2">
                    <Lock size={15} className="text-amber-600 shrink-0" />
                    <span>Log in to track your individual DSA progress and real problem submissions.</span>
                  </div>
                  <button
                    onClick={() => openAuthModal()}
                    className="ml-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded-lg text-xs shrink-0 transition cursor-pointer"
                  >
                    Log In
                  </button>
                </div>
              )}

              {/* Real Topic Breakdown Bars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-xs pt-1">
                {[
                  { name: "Programming Fundamentals", key: "Variables", icon: "📦" },
                  { name: "Arrays", key: "Arrays", icon: "📊" },
                  { name: "Strings", key: "Strings", icon: "🔤" },
                  { name: "Linked Lists", key: "Linked List", icon: "🔗" },
                  { name: "Stacks", key: "Stack", icon: "📚" },
                  { name: "Queues", key: "Queue", icon: "⏳" },
                  { name: "Trees", key: "Trees", icon: "🌿" },
                  { name: "Graphs", key: "Graphs", icon: "🌐" },
                ].map((item) => {
                  const stat = progress?.topicStats?.[item.key] || {
                    solved: 0,
                    attempted: 0,
                    submitted: 0,
                    total: rawWorlds.find((w) => w.topicKey === item.key)?.problemCount || 20,
                    percentage: 0,
                    accuracy: 0,
                  };

                  const percentage = isAuthenticated ? stat.percentage : 0;
                  const solved = isAuthenticated ? stat.solved : 0;
                  const submitted = isAuthenticated ? stat.submitted : 0;
                  const total = stat.total;

                  return (
                    <div key={item.name} className="space-y-1.5 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between font-semibold text-slate-700">
                        <span className="flex items-center gap-1.5 text-slate-900 font-bold">
                          <span>{item.icon}</span>
                          <span>{item.name}</span>
                        </span>

                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="text-slate-600 font-medium">
                            <strong className="text-slate-900 font-bold">{solved}</strong>/{total} Solved
                          </span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-500 font-mono">
                            {submitted} Subm{submitted === 1 ? "" : "s"}
                          </span>
                          <span className="font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 font-bold">
                            {percentage}%
                          </span>
                        </div>
                      </div>

                      <div className="w-full bg-slate-200/80 rounded-full h-2 overflow-hidden border border-slate-200">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            percentage >= 75
                              ? "bg-emerald-500"
                              : percentage >= 35
                              ? "bg-amber-500"
                              : percentage > 0
                              ? "bg-blue-500"
                              : "bg-slate-300"
                          }`}
                          style={{ width: `${percentage}%` }}
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

              {loadingRec && !recommendation ? (
                <div className="text-xs text-slate-400 space-y-2 py-4">
                  <BrainCircuit className="h-8 w-8 text-amber-400 animate-pulse" />
                  <p>Analyzing problem history and identifying weak patterns...</p>
                </div>
              ) : recommendation ? (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                      <span className="text-slate-400 font-medium block text-[11px]">
                        {isAuthenticated ? "Weak Area / Focus" : "Focus Topic"}
                      </span>
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
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] border ${
                        recommendation.recommendation.difficulty === "Easy"
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                          : recommendation.recommendation.difficulty === "Hard"
                          ? "bg-rose-500/20 text-rose-400 border-rose-500/30"
                          : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                      }`}
                    >
                      {recommendation.recommendation.difficulty}
                    </span>
                  </div>

                  {recommendation.question?.title && (
                    <div className="flex items-center justify-between bg-slate-800/40 px-3 py-2 rounded-xl border border-slate-700/60 text-[11px]">
                      <span className="text-slate-400">Target Problem:</span>
                      <span className="font-bold text-amber-200 truncate max-w-[180px]">
                        {recommendation.question.title}
                      </span>
                    </div>
                  )}

                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-amber-200 leading-relaxed font-medium">
                    💡 <span className="font-semibold text-amber-300">Reason:</span> {recommendation.recommendation.reason}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-400 space-y-2 py-4">
                  <BrainCircuit className="h-8 w-8 text-amber-400" />
                  <p>Log in to activate your AI-driven adaptive recommendations.</p>
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
              className="mt-6 w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-md hover:scale-[1.02] cursor-pointer"
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-1">
              <Filter size={14} />
              Filter:
            </span>
            {(["All", "Easy", "Medium", "Hard"] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setFilterDiff(diff)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  filterDiff === diff
                    ? "bg-slate-900 text-white shadow-xs"
                    : diff === "Easy"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                    : diff === "Medium"
                    ? "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                    : diff === "Hard"
                    ? "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {diff === "All" ? "All Modules" : diff}
              </button>
            ))}
          </div>
        </div>

        {/* Worlds Grid with Live Solved Counts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorlds.map((world) => {
            const stat = progress?.topicStats?.[world.topicKey];
            const solvedCount = isAuthenticated && stat ? stat.solved : 0;
            const progressPercent = isAuthenticated && stat ? stat.percentage : 0;

            return (
              <WorldNode
                key={world.title}
                title={world.title}
                icon={world.icon}
                unlocked={world.unlocked}
                current={world.current}
                difficulty={world.difficulty}
                problemCount={world.problemCount}
                solvedCount={solvedCount}
                progressPercent={progressPercent}
                onClick={() => navigate(world.route)}
              />
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default DSAHome;