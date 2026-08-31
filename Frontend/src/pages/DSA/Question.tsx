import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CodeEditor from "../../components/CodeEditor";
import NovaAI from "../../components/NovaAI";
import { ArrowLeft, Play, CheckCircle2, Lightbulb, Loader2 } from "lucide-react";

interface Question {
  id: number;
  title: string;
  difficulty: string;
  statement: string;
  example: {
    input: string;
    output: string;
    explanation: string;
  };
  constraints: string[];
  hints: string[];
  starterCode: string;
}

export default function Question() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/questions/${slug}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch question");
        }

        const result = await response.json();
        setQuestion(result.data);
        setCode(result.data.starterCode);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestion();
  }, [slug]);

  if (loading) {
    return (
      <div className="h-screen bg-[#f8fafc] flex items-center justify-center text-slate-700 text-sm font-semibold gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
        <span>Loading Problem Workspace...</span>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="h-screen bg-[#f8fafc] flex items-center justify-center text-rose-600 text-base font-semibold">
        Question Not Found
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#f8fafc] text-slate-900 flex flex-col overflow-hidden">
      {/* Top Header Bar */}
      <header className="h-12 bg-white border-b border-slate-200 px-4 flex items-center justify-between shrink-0 shadow-xs">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft size={14} />
          <span>Problem List</span>
        </button>

        <span className="font-heading text-sm font-bold text-slate-900">
          {question.title}
        </span>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            {question.difficulty}
          </span>
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 overflow-hidden">
        {/* LEFT PANEL: Problem Description */}
        <div className="overflow-y-auto bg-white border-r border-slate-200 p-6 sm:p-8 space-y-6">
          <div>
            <h1 className="font-heading text-2xl font-extrabold text-slate-900">
              {question.title}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                {question.difficulty}
              </span>
              <span className="text-xs text-slate-400 font-medium">LeetCode Style</span>
            </div>
          </div>

          {/* Statement */}
          <section className="space-y-2">
            <h2 className="font-heading text-sm font-bold text-slate-900 uppercase tracking-wider">
              Problem Statement
            </h2>
            <p className="text-slate-700 leading-relaxed text-sm font-normal">
              {question.statement}
            </p>
          </section>

          {/* Example */}
          <section className="space-y-2">
            <h2 className="font-heading text-sm font-bold text-slate-900 uppercase tracking-wider">
              Example 1
            </h2>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3 font-mono text-xs">
              <div>
                <span className="text-slate-500 font-bold">Input:</span>
                <pre className="text-slate-900 font-semibold bg-white p-2 rounded border border-slate-200 mt-1 overflow-x-auto">
                  {question.example.input}
                </pre>
              </div>

              <div>
                <span className="text-slate-500 font-bold">Output:</span>
                <pre className="text-emerald-700 font-semibold bg-white p-2 rounded border border-slate-200 mt-1 overflow-x-auto">
                  {question.example.output}
                </pre>
              </div>

              {question.example.explanation && (
                <div>
                  <span className="text-slate-500 font-bold font-sans">Explanation:</span>
                  <p className="text-slate-700 font-sans mt-1 font-normal">
                    {question.example.explanation}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Constraints */}
          {question.constraints && (
            <section className="space-y-2">
              <h2 className="font-heading text-sm font-bold text-slate-900 uppercase tracking-wider">
                Constraints
              </h2>
              <ul className="list-disc ml-5 space-y-1.5 text-slate-700 text-xs font-mono">
                {question.constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Hints */}
          {question.hints && (
            <section className="space-y-2 pb-12">
              <h2 className="font-heading text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb size={16} className="text-amber-500" />
                <span>Hints</span>
              </h2>
              <div className="space-y-2">
                {question.hints.map((hint, index) => (
                  <div
                    key={index}
                    className="bg-amber-50/60 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 font-medium"
                  >
                    💡 {hint}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT PANEL: Code Editor */}
        <div className="flex flex-col h-full bg-slate-900 text-slate-100">
          {/* Toolbar */}
          <div className="flex justify-between items-center px-4 py-2.5 border-b border-slate-800 bg-slate-950">
            <span className="text-xs font-bold text-slate-300">
              Code Editor
            </span>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium rounded-md px-3 py-1.5 focus:outline-none"
            >
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
            </select>
          </div>

          {/* Monaco Editor Container */}
          <div className="flex-1 overflow-hidden">
            <CodeEditor
              code={code}
              setCode={setCode}
              language={language}
            />
          </div>

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between p-3.5 border-t border-slate-800 bg-slate-950">
            <span className="text-xs text-slate-500 font-medium">Console Output</span>

            <div className="flex items-center gap-3">
              <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border border-slate-700">
                <Play size={13} className="fill-slate-200" />
                <span>Run Code</span>
              </button>

              <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm">
                <CheckCircle2 size={14} />
                <span>Submit Solution</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* NOVA AI Floating Assistant */}
      <NovaAI
        question={question.statement}
        language={language}
        getCode={() => code}
      />
    </div>
  );
}