import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Code2, ArrowRight, Loader2, Sparkles } from "lucide-react";

interface Question {
  id: number;
  title: string;
  slug: string;
  topic: string;
  difficulty: string;
}

export default function PracticePage() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/questions"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        const result = await response.json();
        setQuestions(result.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load questions.");
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
        <Navbar />
        <div className="flex items-center justify-center gap-3 p-20 text-slate-500 font-semibold">
          <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
          <span>Loading Practice Missions...</span>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
        <Navbar />
        <div className="flex items-center justify-center p-20 text-rose-600 font-semibold">
          {error}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10 w-full">
        {/* Header Panel */}
        <div className="leetcode-panel rounded-xl p-8 mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 mb-3">
            <Sparkles size={13} />
            <span>Curated Problem Sets</span>
          </div>

          <h1 className="font-heading text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Arrays Practice Missions
          </h1>

          <p className="text-slate-600 text-sm mt-1 font-medium">
            Solve real-world algorithmic challenges, optimize time & space complexity, and earn XP.
          </p>
        </div>

        {/* Question List */}
        <div className="space-y-4">
          {questions.map((question) => (
            <div
              key={question.id}
              className="leetcode-card rounded-xl p-5 border border-slate-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs hover:border-blue-500/50"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
                  <Code2 size={20} />
                </div>

                <div>
                  <h3 className="font-heading text-base font-bold text-slate-900">
                    {question.title}
                  </h3>

                  <div className="flex items-center gap-3 mt-1 text-xs">
                    <span className="font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      {question.difficulty}
                    </span>
                    <span className="text-slate-400 font-medium">
                      Topic: {question.topic || "Arrays"}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate(`/question/${question.slug}`)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs"
              >
                <span>Solve Problem</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}