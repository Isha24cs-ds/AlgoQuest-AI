import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";
import CodeEditor from "../../components/CodeEditor";
import NovaAI from "../../components/NovaAI";
import ArenaLiveChat from "../../components/Arena/ArenaLiveChat";

import {
  ArrowLeft,
  Play,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Loader2,
  Terminal,
  Sliders,
  Cpu,
  RotateCcw,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  FileCode2,
  BookOpen,
  Trash2,
  Clock,
  Eye,
  EyeOff,
  X,
} from "lucide-react";

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

    const funcSigMatch = code.match(
      /public:\s*\n?\s*([A-Za-z0-9_:<>&*,\s]+?\s+[A-Za-z0-9_]+\s*\([^)]*\))/
    );

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

  const standaloneMatch = code.match(
    /([A-Za-z0-9_:<>&*,\s]+?\s+[A-Za-z0-9_]+\s*\([^)]*\))/
  );

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
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const activeArenaRoomCode = (
    location.state?.roomCode ||
    searchParams.get("room") ||
    sessionStorage.getItem("activeArenaRoom") ||
    ""
  ).toUpperCase();

  const { requireAuth, token } = useAuth();

  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [initialCode, setInitialCode] = useState("");

  // JDoodle Run Code state
  const [runOutput, setRunOutput] = useState("");
  const [runError, setRunError] = useState("");
  const [running, setRunning] = useState(false);
  const [stdin, setStdin] = useState("");
  const [execStats, setExecStats] = useState<{
    cpuTime?: string;
    memory?: string;
    statusCode?: number;
  } | null>(null);

  // Console Drawer states
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [consoleTab, setConsoleTab] = useState<"output" | "stdin" | "stats">("output");
  const [copied, setCopied] = useState(false);

  // Mobile layout tab
  const [mobileTab, setMobileTab] = useState<"problem" | "editor">("problem");

  // Real Hints tracking
  const [revealedHints, setRevealedHints] = useState<Set<number>>(new Set());

  // Real Time Tracker
  const [startTime] = useState<number>(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Real Submission Results
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any | null>(null);

  // Live Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds(Math.round((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const formatElapsed = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Fetch question
  useEffect(() => {
    async function fetchQuestion() {
      try {
        setLoading(true);

        const response = await fetch(`${API_BASE_URL}/questions/${slug}`);

        if (!response.ok) {
          throw new Error("Failed to fetch question from API");
        }

        const result = await response.json();

        setQuestion(result.data);
        const cleaned = cleanStarterCode(result.data.starterCode);
        setCode(cleaned);
        setInitialCode(cleaned);
      } catch (err) {
        // Fallback to local practice questions
        const allLocalQuestions = [
          ...practiceQuestions,
          ...linkedListPracticeQuestions,
          ...queuePracticeQuestions,
          ...stackPracticeQuestions,
          ...stringsPracticeQuestions,
          ...variablesPracticeQuestions,
        ];

        const localMatch = allLocalQuestions.find(
          (q: any) => q.slug === slug
        );

        if (localMatch) {
          setQuestion(localMatch);
          const cleaned = cleanStarterCode(localMatch.starterCode);
          setCode(cleaned);
          setInitialCode(cleaned);
        } else {
          console.error(
            "Question not found in API or local dataset:",
            err
          );
        }
      } finally {
        setLoading(false);
      }
    }

    fetchQuestion();
  }, [slug]);

  // Run Code using JDoodle (Real Output)
  const handleRunCode = useCallback(async () => {
    try {
      setRunning(true);
      setRunOutput("");
      setRunError("");
      setExecStats(null);
      setConsoleOpen(true);
      setConsoleTab("output");

      const response = await fetch(`${API_BASE_URL}/execution/run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language,
          stdin,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || data.message || "Code execution failed"
        );
      }

      setRunOutput(data.output || "");
      setRunError(data.error || "");
      setExecStats({
        cpuTime: data.cpuTime,
        memory: data.memory,
        statusCode: data.statusCode,
      });
    } catch (err: any) {
      console.error("Run Code error:", err);
      setRunError(
        err.message || "Unable to execute code. Please check your network and JDoodle credentials."
      );
    } finally {
      setRunning(false);
    }
  }, [code, language, stdin]);

  // Keyboard shortcut: Ctrl+Enter / Cmd+Enter to Run
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRunCode();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRunCode]);

  // Copy output to clipboard
  const handleCopyOutput = () => {
    const textToCopy = runOutput || runError || "";
    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Reset code to original
  const handleResetCode = () => {
    if (confirm("Reset editor to original starter code?")) {
      setCode(initialCode);
    }
  };

  // Hint Toggle
  const toggleHint = (index: number) => {
    setRevealedHints((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  // Normalize string for real test evaluation
  const normalizeOutput = (val: string) => {
    if (!val) return "";
    return val
      .replace(/\r\n/g, "\n")
      .trim()
      .replace(/^["'`]|["'`]$/g, "")
      .toLowerCase();
  };

  // Evaluate real results against problem testcase
  const evaluateRealStatus = (
    actualOutput: string,
    expectedOutput: string,
    error: string,
    isHttpOk: boolean
  ): "ACCEPTED" | "WRONG_ANSWER" | "RUNTIME_ERROR" | "COMPILATION_ERROR" => {
    if (!isHttpOk || error) {
      if (error?.toLowerCase().includes("compil") || error?.toLowerCase().includes("syntax")) {
        return "COMPILATION_ERROR";
      }
      return "RUNTIME_ERROR";
    }

    if (!expectedOutput) {
      return "ACCEPTED";
    }

    const normActual = normalizeOutput(actualOutput);
    const normExpected = normalizeOutput(expectedOutput);

    if (normActual === normExpected || normActual.includes(normExpected)) {
      return "ACCEPTED";
    }

    // Try parsing JSON structures if applicable (arrays/objects)
    try {
      const parsedActual = JSON.parse(normActual);
      const parsedExpected = JSON.parse(normExpected);
      if (JSON.stringify(parsedActual) === JSON.stringify(parsedExpected)) {
        return "ACCEPTED";
      }
    } catch {
      // Ignore JSON parse errors and use direct comparison
    }

    return "WRONG_ANSWER";
  };

  // Real submission flow with real JDoodle evaluation & DB record
  async function handleSubmitSolution() {
    if (!question) return;

    requireAuth(async () => {
      try {
        setSubmitting(true);
        setConsoleOpen(true);
        setConsoleTab("output");

        // 1. Run real execution via JDoodle first
        const execResponse = await fetch(`${API_BASE_URL}/execution/run`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
            language,
            stdin: stdin || question.example?.input || "",
          }),
        });

        const execData = await execResponse.json();
        const actualOutput = execData.output || "";
        const actualError = execData.error || "";

        setRunOutput(actualOutput);
        setRunError(actualError);
        setExecStats({
          cpuTime: execData.cpuTime,
          memory: execData.memory,
          statusCode: execData.statusCode,
        });

        // 2. Evaluate real status
        const realStatus = evaluateRealStatus(
          actualOutput,
          question.example?.output || "",
          actualError,
          execResponse.ok && execData.success
        );

        // 3. Real metrics
        const timeTakenSeconds = Math.max(1, Math.round((Date.now() - startTime) / 1000));
        const hintsUsedCount = revealedHints.size;
        const realRuntime = execData.cpuTime ? parseFloat(execData.cpuTime) * 1000 : 25.0;
        const realMemory = execData.memory ? parseFloat(execData.memory) / 1024 : 14.2;

        // 4. Save to backend database
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}/submissions`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            questionId: question.id || 1,
            slug: (question as any).slug || slug,
            title: question.title,
            topic: (question as any).topic || "Arrays",
            difficulty: question.difficulty,
            code,
            language,
            status: realStatus,
            runtime: realRuntime,
            memory: realMemory,
            timeTaken: timeTakenSeconds,
            hintsUsed: hintsUsedCount,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setSubmissionResult({
            ...data.data,
            status: realStatus,
            timeTaken: timeTakenSeconds,
            hintsUsed: hintsUsedCount,
            actualOutput,
            expectedOutput: question.example?.output,
            error: actualError,
            cpuTime: execData.cpuTime,
            memory: execData.memory,
          });
        } else {
          setSubmissionResult({
            status: realStatus,
            attemptsCount: 1,
            hintsUsed: hintsUsedCount,
            timeTaken: timeTakenSeconds,
            actualOutput,
            expectedOutput: question.example?.output,
            error: actualError,
            cpuTime: execData.cpuTime,
            memory: execData.memory,
          });
        }
      } catch (err: any) {
        console.error("Submission error:", err);
        setSubmissionResult({
          status: "RUNTIME_ERROR",
          attemptsCount: 1,
          hintsUsed: revealedHints.size,
          timeTaken: Math.max(1, Math.round((Date.now() - startTime) / 1000)),
          error: err.message || "Failed to execute submission",
        });
      } finally {
        setSubmitting(false);
      }
    });
  }

  if (loading) {
    return (
      <div className="h-screen w-screen bg-slate-950 flex items-center justify-center text-slate-200 text-sm font-semibold gap-3">
        <Loader2 className="h-7 w-7 animate-spin text-amber-500" />
        <span>Loading Problem Workspace...</span>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="h-screen w-screen bg-slate-950 flex items-center justify-center text-rose-500 text-base font-semibold">
        Question Not Found
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden select-none">
      {/* Top Header */}
      <header className="h-12 shrink-0 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-700 cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Problem List</span>
          </button>

          <span className="font-heading text-sm font-bold text-slate-100 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
            {question.title}
          </span>

          {activeArenaRoomCode && (
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold font-mono shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span>Arena Room: {activeArenaRoomCode}</span>
            </div>
          )}
        </div>

        {/* Center Live Metrics */}
        <div className="hidden md:flex items-center gap-4 text-xs font-medium text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800">
            <Clock size={13} className="text-amber-400" />
            <span>Time:</span>
            <strong className="text-slate-200 font-mono">{formatElapsed(elapsedSeconds)}</strong>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800">
            <Lightbulb size={13} className="text-amber-400" />
            <span>Hints Used:</span>
            <strong className="text-slate-200 font-mono">{revealedHints.size}</strong>
          </div>
        </div>

        {/* Mobile View Switcher */}
        <div className="flex lg:hidden items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs font-semibold">
          <button
            onClick={() => setMobileTab("problem")}
            className={`px-3 py-1 rounded-md transition flex items-center gap-1.5 cursor-pointer ${
              mobileTab === "problem"
                ? "bg-amber-500 text-slate-950 font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <BookOpen size={13} />
            <span>Problem</span>
          </button>
          <button
            onClick={() => setMobileTab("editor")}
            className={`px-3 py-1 rounded-md transition flex items-center gap-1.5 cursor-pointer ${
              mobileTab === "editor"
                ? "bg-amber-500 text-slate-950 font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileCode2 size={13} />
            <span>Editor</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span
            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
              question.difficulty === "Easy"
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : question.difficulty === "Medium"
                ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                : "bg-rose-500/10 text-rose-400 border-rose-500/30"
            }`}
          >
            {question.difficulty}
          </span>
        </div>
      </header>

      {/* Main Split Body Layout */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* LEFT PANEL: Problem Description */}
        <div
          className={`h-full min-h-0 overflow-y-auto bg-slate-900 border-r border-slate-800 p-6 sm:p-8 space-y-6 select-text ${
            mobileTab === "problem" ? "block" : "hidden lg:block"
          }`}
        >
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-md border ${
                  question.difficulty === "Easy"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    : question.difficulty === "Medium"
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                }`}
              >
                {question.difficulty}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                LeetCode Style
              </span>
            </div>

            <h1 className="font-heading text-2xl font-extrabold text-white mt-2">
              {question.title}
            </h1>
          </div>

          {/* Statement */}
          <section className="space-y-2">
            <h2 className="font-heading text-xs font-bold text-slate-400 uppercase tracking-wider">
              Problem Statement
            </h2>
            <p className="text-slate-200 leading-relaxed text-sm">
              {question.statement}
            </p>
          </section>

          {/* Example */}
          <section className="space-y-2">
            <h2 className="font-heading text-xs font-bold text-slate-400 uppercase tracking-wider">
              Example 1
            </h2>
            <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-3 font-mono text-xs">
              <div>
                <span className="text-slate-400 font-bold">Input:</span>
                <pre className="text-slate-200 font-semibold bg-slate-900 p-2.5 rounded-lg border border-slate-800 mt-1 overflow-x-auto">
                  {question.example.input}
                </pre>
              </div>

              <div>
                <span className="text-slate-400 font-bold">Output:</span>
                <pre className="text-emerald-400 font-semibold bg-slate-900 p-2.5 rounded-lg border border-slate-800 mt-1 overflow-x-auto">
                  {question.example.output}
                </pre>
              </div>

              {question.example.explanation && (
                <div>
                  <span className="text-slate-400 font-bold font-sans">
                    Explanation:
                  </span>
                  <p className="text-slate-300 font-sans mt-1">
                    {question.example.explanation}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Constraints */}
          {question.constraints && question.constraints.length > 0 && (
            <section className="space-y-2">
              <h2 className="font-heading text-xs font-bold text-slate-400 uppercase tracking-wider">
                Constraints
              </h2>
              <ul className="list-disc ml-5 space-y-1.5 text-slate-300 text-xs font-mono">
                {question.constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Hints Section with Interactive Reveal */}
          {question.hints && question.hints.length > 0 && (
            <section className="space-y-2.5 pb-10">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Lightbulb size={15} className="text-amber-400" />
                  <span>Hints ({revealedHints.size}/{question.hints.length} revealed)</span>
                </h2>
              </div>

              <div className="space-y-2">
                {question.hints.map((hint, index) => {
                  const isRevealed = revealedHints.has(index);
                  return (
                    <div
                      key={index}
                      className="bg-slate-950/80 border border-slate-800 rounded-xl overflow-hidden transition"
                    >
                      <button
                        onClick={() => toggleHint(index)}
                        className="w-full px-3.5 py-2.5 flex items-center justify-between text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/50 transition cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <Lightbulb size={14} className={isRevealed ? "text-amber-400" : "text-slate-500"} />
                          <span>Hint {index + 1}</span>
                        </span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          {isRevealed ? (
                            <>
                              <EyeOff size={12} />
                              <span>Hide</span>
                            </>
                          ) : (
                            <>
                              <Eye size={12} />
                              <span>Show</span>
                            </>
                          )}
                        </span>
                      </button>

                      {isRevealed && (
                        <div className="px-3.5 pb-3 text-xs text-amber-200/90 leading-relaxed bg-amber-500/5 border-t border-slate-800/60 pt-2 font-medium">
                          💡 {hint}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT PANEL: Editor, Console Drawer, and Action Bar */}
        <div
          className={`h-full min-h-0 flex flex-col bg-slate-950 overflow-hidden relative ${
            mobileTab === "editor" ? "flex" : "hidden lg:flex"
          }`}
        >
          {/* Top Editor Toolbar */}
          <div className="shrink-0 h-11 px-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <FileCode2 size={14} className="text-amber-400" />
                <span className="hidden sm:inline">Language:</span>
              </span>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg px-2.5 py-1 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="cpp">C++ (GCC 11)</option>
                <option value="java">Java (JDK 17)</option>
                <option value="python">Python 3</option>
                <option value="javascript">JavaScript (Node.js)</option>
              </select>

              <button
                onClick={handleResetCode}
                title="Reset to starter code"
                className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md transition cursor-pointer"
              >
                <RotateCcw size={13} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden md:inline-block text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60">
                Ctrl + Enter to Run
              </span>

              {/* Console Toggle Button */}
              <button
                onClick={() => setConsoleOpen(!consoleOpen)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition cursor-pointer ${
                  consoleOpen
                    ? "bg-slate-800 text-amber-400 border-slate-700"
                    : runError
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse"
                    : runOutput
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:text-white"
                }`}
              >
                <Terminal size={13} />
                <span>Console</span>
                {running ? (
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                ) : runError ? (
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                ) : runOutput ? (
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                ) : null}
                {consoleOpen ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
              </button>
            </div>
          </div>

          {/* Monaco Code Editor */}
          <div className="flex-1 min-h-0 w-full relative overflow-hidden bg-slate-900">
            <CodeEditor
              code={code}
              setCode={setCode}
              language={language === "python" ? "python" : language === "javascript" ? "javascript" : language}
            />
          </div>

          {/* INTERACTIVE CONSOLE DRAWER (Guaranteed In-Frame, Scrollable) */}
          {consoleOpen && (
            <div className="shrink-0 flex flex-col bg-slate-950 border-t border-slate-800 max-h-[42vh] min-h-[160px] animate-in slide-in-from-bottom duration-200">
              {/* Console Tabs & Controls */}
              <div className="h-9 px-3 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setConsoleTab("output")}
                    className={`px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                      consoleTab === "output"
                        ? "bg-slate-800 text-amber-400 border border-slate-700"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Terminal size={12} />
                    <span>Output</span>
                    {runError ? (
                      <span className="text-[10px] bg-rose-500/20 text-rose-400 px-1 rounded font-mono">
                        Error
                      </span>
                    ) : runOutput ? (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1 rounded font-mono">
                        OK
                      </span>
                    ) : null}
                  </button>

                  <button
                    onClick={() => setConsoleTab("stdin")}
                    className={`px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                      consoleTab === "stdin"
                        ? "bg-slate-800 text-amber-400 border border-slate-700"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Sliders size={12} />
                    <span>Custom Input (stdin)</span>
                    {stdin && (
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    )}
                  </button>

                  {execStats && (
                    <button
                      onClick={() => setConsoleTab("stats")}
                      className={`px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                        consoleTab === "stats"
                          ? "bg-slate-800 text-amber-400 border border-slate-700"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <Cpu size={12} />
                      <span>Stats</span>
                    </button>
                  )}
                </div>

                {/* Console Actions */}
                <div className="flex items-center gap-1">
                  {(runOutput || runError) && (
                    <>
                      <button
                        onClick={handleCopyOutput}
                        title="Copy console output"
                        className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition flex items-center gap-1 text-[11px] cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <Check size={12} className="text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span className="hidden sm:inline">Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setRunOutput("");
                          setRunError("");
                          setExecStats(null);
                        }}
                        title="Clear output"
                        className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition cursor-pointer"
                      >
                        <Trash2 size={12} />
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => setConsoleOpen(false)}
                    title="Minimize console"
                    className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition ml-1 cursor-pointer"
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>

              {/* Console Body Area */}
              <div className="flex-1 min-h-[120px] max-h-[30vh] overflow-y-auto p-3 font-mono text-xs select-text bg-slate-950">
                {/* TAB 1: OUTPUT */}
                {consoleTab === "output" && (
                  <div className="space-y-2">
                    {running ? (
                      <div className="flex items-center justify-center gap-3 py-8 text-amber-400">
                        <Loader2 size={18} className="animate-spin" />
                        <span className="font-semibold text-xs font-sans">
                          Executing code on JDoodle cloud compiler...
                        </span>
                      </div>
                    ) : runError ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-rose-400 font-bold font-sans text-xs">
                          <AlertCircle size={14} />
                          <span>Execution / Compilation Error:</span>
                        </div>
                        <pre className="bg-rose-950/40 border border-rose-900/60 text-rose-300 rounded-lg p-3 whitespace-pre-wrap break-words leading-relaxed font-mono">
                          {runError}
                        </pre>
                      </div>
                    ) : runOutput ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-slate-400 font-sans text-[11px] pb-1 border-b border-slate-800">
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 size={12} /> Standard Output (stdout):
                          </span>
                          {execStats && (
                            <span>
                              Time: <strong className="text-slate-200">{execStats.cpuTime || "0.00"}s</strong> | Memory: <strong className="text-slate-200">{execStats.memory || "0"} KB</strong>
                            </span>
                          )}
                        </div>
                        <pre className="text-emerald-400 bg-slate-900/80 border border-slate-800/80 rounded-lg p-3 whitespace-pre-wrap break-words leading-relaxed font-mono">
                          {runOutput}
                        </pre>
                      </div>
                    ) : (
                      <div className="text-slate-500 py-6 text-center font-sans text-xs space-y-1">
                        <p>No execution output yet.</p>
                        <p className="text-[11px] text-slate-600">
                          Click <strong className="text-slate-400">Run Code</strong> or press <strong className="text-slate-400">Ctrl + Enter</strong> to compile and execute.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: STDIN INPUT */}
                {consoleTab === "stdin" && (
                  <div className="space-y-2">
                    <label className="text-[11px] font-sans font-bold text-slate-300 block">
                      Standard Input (passed to cin / Scanner / input()):
                    </label>
                    <textarea
                      value={stdin}
                      onChange={(e) => setStdin(e.target.value)}
                      placeholder="Enter custom inputs for your program here (e.g. 5&#10;1 2 3 4 5)..."
                      className="w-full h-24 bg-slate-900 border border-slate-700 text-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-amber-500 text-xs font-mono resize-none leading-relaxed"
                    />
                  </div>
                )}

                {/* TAB 3: STATS */}
                {consoleTab === "stats" && execStats && (
                  <div className="grid grid-cols-3 gap-3 py-2 font-sans">
                    <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                      <span className="text-[11px] text-slate-400 font-medium block">
                        CPU Runtime
                      </span>
                      <span className="text-sm font-bold text-amber-400 mt-1 block">
                        {execStats.cpuTime ? `${execStats.cpuTime} s` : "N/A"}
                      </span>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                      <span className="text-[11px] text-slate-400 font-medium block">
                        Memory Used
                      </span>
                      <span className="text-sm font-bold text-blue-400 mt-1 block">
                        {execStats.memory ? `${execStats.memory} KB` : "N/A"}
                      </span>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                      <span className="text-[11px] text-slate-400 font-medium block">
                        Status Code
                      </span>
                      <span className="text-sm font-bold text-emerald-400 mt-1 block">
                        {execStats.statusCode ?? 200} OK
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bottom Pinned Action Bar (Clean, Real Results) */}
          <div className="shrink-0 bg-slate-950 border-t border-slate-800 p-3 flex items-center justify-between gap-3 z-10">
            {/* Left Status Chips */}
            <div className="flex items-center gap-3 text-xs">
              <button
                onClick={() => setConsoleOpen(!consoleOpen)}
                className="flex items-center gap-1.5 text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-800 transition cursor-pointer"
              >
                <Terminal size={13} className="text-amber-400" />
                <span className="font-semibold">Console</span>
                {runError ? (
                  <span className="text-[10px] text-rose-400 font-bold bg-rose-500/10 px-1.5 py-0.2 rounded border border-rose-500/30">
                    Error
                  </span>
                ) : runOutput ? (
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/30">
                    OK
                  </span>
                ) : null}
              </button>

              <div className="hidden sm:flex items-center gap-2 text-slate-400 text-xs">
                <span className="flex items-center gap-1 font-mono">
                  <Clock size={12} className="text-slate-500" />
                  {formatElapsed(elapsedSeconds)}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Lightbulb size={12} className="text-slate-500" />
                  {revealedHints.size} hint{revealedHints.size === 1 ? "" : "s"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 ml-auto">
              {/* RUN CODE BUTTON */}
              <button
                onClick={handleRunCode}
                disabled={running || submitting}
                className="bg-slate-800 hover:bg-slate-700 active:scale-95 disabled:opacity-50 text-slate-100 px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border border-slate-700 shadow-sm cursor-pointer"
              >
                {running ? (
                  <>
                    <Loader2 size={14} className="animate-spin text-amber-400" />
                    <span>Running...</span>
                  </>
                ) : (
                  <>
                    <Play size={13} className="fill-amber-400 text-amber-400" />
                    <span>Run Code</span>
                  </>
                )}
              </button>

              {/* SUBMIT BUTTON */}
              <button
                onClick={handleSubmitSolution}
                disabled={submitting || running}
                className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 disabled:opacity-50 text-white px-5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md shadow-emerald-900/30 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin text-white" />
                    <span>Evaluating...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={14} />
                    <span>Submit</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Real Submission Result Modal */}
      {submissionResult && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-5 text-slate-100 animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                {submissionResult.status === "ACCEPTED" ? (
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                ) : (
                  <XCircle className="h-6 w-6 text-rose-400" />
                )}
                <div>
                  <h3 className="font-heading text-lg font-extrabold text-white">
                    {submissionResult.status === "ACCEPTED"
                      ? "Solution Accepted! 🎉"
                      : submissionResult.status === "WRONG_ANSWER"
                      ? "Wrong Answer"
                      : "Execution Error"}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Evaluated live with JDoodle Compiler & Testcase
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                    submissionResult.status === "ACCEPTED"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : submissionResult.status === "WRONG_ANSWER"
                      ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                  }`}
                >
                  {submissionResult.status}
                </span>

                <button
                  onClick={() => setSubmissionResult(null)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg transition"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Test Results Comparison (if wrong answer or error) */}
            {submissionResult.status === "WRONG_ANSWER" && (
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                <div>
                  <span className="text-slate-400 font-bold block mb-1">Expected Output:</span>
                  <pre className="text-emerald-400 bg-slate-900 p-2 rounded border border-slate-800 whitespace-pre-wrap">
                    {submissionResult.expectedOutput || "N/A"}
                  </pre>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block mb-1">Your Output:</span>
                  <pre className="text-rose-400 bg-slate-900 p-2 rounded border border-slate-800 whitespace-pre-wrap">
                    {submissionResult.actualOutput || "(No output produced)"}
                  </pre>
                </div>
              </div>
            )}

            {submissionResult.error && submissionResult.status !== "ACCEPTED" && (
              <div className="bg-rose-950/40 border border-rose-900/60 p-3 rounded-xl text-xs font-mono text-rose-300 whitespace-pre-wrap max-h-36 overflow-y-auto">
                {submissionResult.error}
              </div>
            )}

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-medium block">Attempts</span>
                <span className="font-extrabold text-white text-sm mt-0.5 block font-mono">
                  {submissionResult.attemptsCount || 1}
                </span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-medium block">Hints Used</span>
                <span className="font-extrabold text-amber-400 text-sm mt-0.5 block font-mono">
                  {submissionResult.hintsUsed ?? revealedHints.size}
                </span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-medium block">Time Taken</span>
                <span className="font-extrabold text-white text-sm mt-0.5 block font-mono">
                  {submissionResult.timeTaken
                    ? formatElapsed(submissionResult.timeTaken)
                    : formatElapsed(elapsedSeconds)}
                </span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-medium block">Runtime</span>
                <span className="font-extrabold text-emerald-400 text-sm mt-0.5 block font-mono">
                  {submissionResult.cpuTime ? `${submissionResult.cpuTime}s` : "0.02s"}
                </span>
              </div>
            </div>

            {/* Progress Message */}
            {submissionResult.status === "ACCEPTED" ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-xs text-emerald-200 leading-relaxed font-medium">
                ✨ <span className="font-bold">Progress Recorded!</span> Your actual performance telemetry has been logged and your skill mastery updated.
              </div>
            ) : (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-xs text-amber-200 leading-relaxed font-medium">
                💡 <span className="font-bold">Need assistance?</span> Ask Nova AI on the right for hints, logic suggestions, or debugging help.
              </div>
            )}

            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => setSubmissionResult(null)}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition cursor-pointer"
              >
                {submissionResult.status === "ACCEPTED" ? "Continue Practice Path" : "Try Again"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nova AI */}
      <NovaAI
        question={question.statement}
        language={language}
        getCode={() => code}
      />

      {/* Arena Battle Live Chat when in Arena mode */}
      {activeArenaRoomCode && (
        <ArenaLiveChat
          roomCode={activeArenaRoomCode}
          mode="floating"
          defaultOpen={false}
        />
      )}
    </div>
  );
}