import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../context/AuthContext";
import {
  Bot,
  Sparkles,
  Trash2,
  X,
  HelpCircle,
  Lightbulb,
  Bug,
  Zap,
  Send,
  Loader2,
} from "lucide-react";

interface Props {
  question: string;
  language: string;
  getCode: () => string;
}

export default function NovaAI({
  question,
  language,
  getCode,
}: Props) {
  const { requireAuth, token } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");

  async function askNova(prompt: string) {
    if (!prompt.trim()) return;

    requireAuth(async () => {
      setLoading(true);

      try {
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(
          "http://localhost:5000/api/v1/ai/chat",
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              question,
              language,
              code: getCode(),
              userMessage: prompt,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setAnswer(data.message || "Something went wrong.");
        } else {
          setAnswer(data.answer);
        }
      } catch (err) {
        console.error(err);
        setAnswer("Unable to connect to Nova AI mentor.");
      }

      setLoading(false);
    });
  }


  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-20 right-6 z-50 px-4 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xl border border-amber-400 flex items-center gap-2 hover:scale-105 transition-all"
        title="Ask Nova AI Mentor"
      >
        <div className="h-6 w-6 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center font-bold">
          <Bot size={14} />
        </div>
        <span>Ask Nova AI</span>
        <Sparkles size={14} className="fill-slate-950 stroke-none" />
      </button>

      {/* Nova Panel Modal */}
      {open && (
        <div className="fixed right-6 bottom-36 w-[420px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-10rem)] bg-white rounded-2xl border border-slate-200 shadow-2xl z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-slate-100 p-4 bg-slate-50/80">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold border border-amber-400 shadow-xs">
                <Bot size={20} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-heading text-base font-extrabold text-slate-900">
                    Nova AI Mentor
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                    Pro
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Your Personal Coding Companion
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setAnswer("");
                  setMessage("");
                }}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
                title="Clear Chat"
              >
                <Trash2 size={16} />
              </button>

              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
                title="Close Nova AI"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
            {/* Action Chips */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() =>
                  askNova("Explain this problem in simple words.")
                }
                className="inline-flex items-center gap-2 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-slate-700 hover:text-amber-900 rounded-xl p-2.5 text-xs font-semibold transition text-left shadow-xs"
              >
                <HelpCircle size={14} className="text-amber-500 shrink-0" />
                <span>Explain Problem</span>
              </button>

              <button
                onClick={() =>
                  askNova("Give me a hint without revealing the answer.")
                }
                className="inline-flex items-center gap-2 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-slate-700 hover:text-amber-900 rounded-xl p-2.5 text-xs font-semibold transition text-left shadow-xs"
              >
                <Lightbulb size={14} className="text-amber-500 shrink-0" />
                <span>Give Hint</span>
              </button>

              <button
                onClick={() => askNova("Find bugs in my code.")}
                className="inline-flex items-center gap-2 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-slate-700 hover:text-rose-900 rounded-xl p-2.5 text-xs font-semibold transition text-left shadow-xs"
              >
                <Bug size={14} className="text-rose-500 shrink-0" />
                <span>Find Bug</span>
              </button>

              <button
                onClick={() => askNova("Optimize my solution.")}
                className="inline-flex items-center gap-2 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-900 rounded-xl p-2.5 text-xs font-semibold transition text-left shadow-xs"
              >
                <Zap size={14} className="text-blue-500 shrink-0" />
                <span>Optimize Code</span>
              </button>
            </div>

            {/* Custom Input */}
            <div className="space-y-2 pt-1">
              <textarea
                placeholder="Ask Nova anything about code logic, complexity, or edge cases..."
                className="w-full h-24 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <button
                onClick={() => askNova(message)}
                disabled={loading || !message.trim()}
                className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl p-2.5 text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Ask Nova</span>
                <Send size={13} />
              </button>
            </div>

            {/* Loading Indicator */}
            {loading && (
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-3">
                <Loader2 size={16} className="animate-spin text-amber-600" />
                <span>Nova AI is analyzing your prompt...</span>
              </div>
            )}

            {/* Response Box */}
            {answer && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-normal leading-relaxed text-slate-800 shadow-xs max-h-72 overflow-y-auto space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-800 mb-1 pb-1 border-b border-slate-200">
                  <Sparkles size={12} className="text-amber-600 fill-amber-500" />
                  <span>Nova AI Guidance:</span>
                </div>
                <ReactMarkdown>{answer}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}