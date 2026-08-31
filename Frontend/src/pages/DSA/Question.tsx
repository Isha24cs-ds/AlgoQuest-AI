import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CodeEditor from "../../components/CodeEditor";

import NovaAI from "../../components/NovaAI";
import { ArrowLeft, Play, CheckCircle2, Lightbulb, Loader2 } from "lucide-react";
import { practiceQuestions } from "../../data/practiceQuestions";
import { linkedListPracticeQuestions } from "../../data/linkedListPracticeQuestions";
import { queuePracticeQuestions } from "../../data/queuePracticeQuestions";
import { stackPracticeQuestions } from "../../data/stackPracticeQuestions";
import { stringsPracticeQuestions } from "../../data/stringsPracticeQuestions";
import { variablesPracticeQuestions } from "../../data/variablesPracticeQuestions";

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

function cleanStarterCode(code: string): string {
  if (!code) return "";

  if (code.includes("class Solution")) {
    const includesHeader = code.split(/class\s+Solution/)[0] || "";
    const funcSigMatch = code.match(/public:\s*\n?\s*([A-Za-z0-9_:<>&*,\s]+?\s+[A-Za-z0-9_]+\s*\([^)]*\))/);
    if (funcSigMatch) {
      const funcSig = funcSigMatch[1].trim();
      return `${includesHeader.trim()}

class Solution {
public:
    ${funcSig} {
        // Write your solution here
    }
};`;
    }
  }

  const standaloneMatch = code.match(/([A-Za-z0-9_:<>&*,\s]+?\s+[A-Za-z0-9_]+\s*\([^)]*\))/);
  if (standaloneMatch) {
    const includesHeader = code.split(standaloneMatch[0])[0] || "";
    return `${includesHeader.trim()}

${standaloneMatch[1].trim()} {
    // Write your solution here
}`;
  }

  return code;
}



export default function QuestionPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  /* DEV_SIMULATION: Development-only submission state for testing adaptive pipeline without Judge0 */
  const [simulatedStatus, setSimulatedStatus] = useState<"ACCEPTED" | "WRONG_ANSWER" | "TIME_LIMIT_EXCEEDED" | "RUNTIME_ERROR">("ACCEPTED");
  const [simulatedTimeTaken, setSimulatedTimeTaken] = useState<number>(120);
  const [simulatedHintsUsed, setSimulatedHintsUsed] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any | null>(null);
  const [startTime] = useState<number>(Date.now());
  const { requireAuth, token } = useAuth();

  async function handleSubmitSolution() {
    if (!question) return;

    requireAuth(async () => {
      try {
        setSubmitting(true);
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const calculatedTime = Math.round((Date.now() - startTime) / 1000);
        const timeTakenSeconds = simulatedTimeTaken > 0 ? simulatedTimeTaken : calculatedTime;

        /* DEV_SIMULATION: Submits simulation result to DB backend (POST /api/v1/submissions) to trigger real adaptive engine pipeline */
        const response = await fetch("http://localhost:5000/api/v1/submissions", {
          method: "POST",
          headers,
          body: JSON.stringify({
            questionId: question.id || 1,
            code,
            language,
            status: simulatedStatus,
            runtime: simulatedStatus === "ACCEPTED" ? 28.4 : null,
            memory: simulatedStatus === "ACCEPTED" ? 14.2 : null,
            timeTaken: timeTakenSeconds,
            hintsUsed: simulatedHintsUsed,
          }),
        });

        const data = await response.json();
        if (response.ok && data.success) {
          setSubmissionResult(data.data);
        } else {
          setSubmissionResult({
            status: simulatedStatus,
            attemptsCount: 1,
            hintsUsed: simulatedHintsUsed,
            timeTaken: timeTakenSeconds,
          });
        }
      } catch (err) {
        console.error("Dev Simulation submission error:", err);
        setSubmissionResult({
          status: simulatedStatus,
          attemptsCount: 1,
          hintsUsed: simulatedHintsUsed,
          timeTaken: simulatedTimeTaken,
        });
      } finally {
        setSubmitting(false);
      }
    });
  }





  useEffect(() => {
    async function fetchQuestion() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/v1/questions/${slug}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch question from API");
        }

        const result = await response.json();
        setQuestion(result.data);
        setCode(cleanStarterCode(result.data.starterCode));
      } catch (err) {
        // Fallback to static practice datasets
        const allLocalQuestions = [
          ...practiceQuestions,
          ...linkedListPracticeQuestions,
          ...queuePracticeQuestions,
          ...stackPracticeQuestions,
          ...stringsPracticeQuestions,
          ...variablesPracticeQuestions,
        ];
        const localMatch = allLocalQuestions.find((q: any) => q.slug === slug);
        if (localMatch) {
          setQuestion(localMatch);
          setCode(cleanStarterCode(localMatch.starterCode));
        } else {
          console.error("Question not found in API or local dataset:", err);
        }
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

          {/* DEV_SIMULATION: Bottom Action Bar & Pre-Judge0 Simulation Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-3 border-t border-slate-800 bg-slate-950 gap-3">
            {/* DEV SIMULATION SELECTORS */}
            <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                🧪 Dev Simulation:
              </span>

              <select
                value={simulatedStatus}
                onChange={(e) => setSimulatedStatus(e.target.value as any)}
                className="bg-slate-800 text-slate-200 border border-slate-700 rounded px-2 py-1 text-[11px] font-semibold focus:outline-none"
                title="Select simulated outcome"
              >
                <option value="ACCEPTED">ACCEPTED (Pass)</option>
                <option value="WRONG_ANSWER">WRONG_ANSWER (Fail)</option>
                <option value="TIME_LIMIT_EXCEEDED">TIME_LIMIT_EXCEEDED (TLE)</option>
                <option value="RUNTIME_ERROR">RUNTIME_ERROR (Error)</option>
              </select>

              <select
                value={simulatedHintsUsed}
                onChange={(e) => setSimulatedHintsUsed(Number(e.target.value))}
                className="bg-slate-800 text-slate-200 border border-slate-700 rounded px-2 py-1 text-[11px] font-semibold focus:outline-none"
                title="Select hints used count"
              >
                <option value={0}>0 Hints</option>
                <option value={1}>1 Hint</option>
                <option value={2}>2 Hints</option>
              </select>

              <select
                value={simulatedTimeTaken}
                onChange={(e) => setSimulatedTimeTaken(Number(e.target.value))}
                className="bg-slate-800 text-slate-200 border border-slate-700 rounded px-2 py-1 text-[11px] font-semibold focus:outline-none"
                title="Select simulated time taken"
              >
                <option value={30}>30s Time</option>
                <option value={60}>60s Time</option>
                <option value={120}>120s Time</option>
                <option value={300}>300s Time</option>
              </select>

            </div>

            <div className="flex items-center gap-3">
              <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border border-slate-700">
                <Play size={13} className="fill-slate-200" />
                <span>Run Code</span>
              </button>

              <button
                onClick={handleSubmitSolution}
                disabled={submitting}
                className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white px-5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
              >
                {submitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin text-white" />
                    <span>Saving to DB...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={14} />
                    <span>Submit & Test Adaptive Flow</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Solution Journey Modal Overlay */}
      {submissionResult && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-5 text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                <h3 className="font-heading text-lg font-extrabold text-slate-900">
                  Solution Journey Summary
                </h3>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {submissionResult.status || "Accepted"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-medium block">Attempts Count</span>
                <span className="font-extrabold text-slate-900 text-base mt-0.5 block">
                  {submissionResult.attemptsCount || 1}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-medium block">Hints Used</span>
                <span className="font-extrabold text-amber-600 text-base mt-0.5 block">
                  {submissionResult.hintsUsed ?? 1}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-medium block">Final Status</span>
                <span className="font-extrabold text-emerald-600 text-base mt-0.5 block">
                  {submissionResult.status || "Accepted"}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-medium block">Time Taken</span>
                <span className="font-extrabold text-slate-900 text-base mt-0.5 block">
                  {submissionResult.timeTaken ? `${Math.round(submissionResult.timeTaken / 60)} min` : "2 min"}
                </span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 leading-relaxed font-medium">
              ✨ <span className="font-bold">Adaptive Progress Recorded!</span> Your performance data has updated your topic mastery scores. Nova AI has analyzed your submission.
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSubmissionResult(null)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition"
              >
                Continue Practice Path
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NOVA AI Floating Assistant */}
      <NovaAI
        question={question.statement}
        language={language}
        getCode={() => code}
      />
    </div>
  );
}
