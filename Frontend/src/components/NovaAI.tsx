import { useState } from "react";
import ReactMarkdown from "react-markdown";

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
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");

  async function askNova(prompt: string) {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/ai/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
      setAnswer("Unable to connect to Nova AI.");
    }

    setLoading(false);
  }

  return (
    <>
      {/* Floating Robot */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-28 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-3xl shadow-2xl hover:scale-105 transition"
      >
        🤖
      </button>

      {/* Nova Panel */}
      {open && (
        <div className="fixed right-8 bottom-48 w-[450px] h-[650px] bg-slate-900 rounded-xl border border-slate-700 shadow-2xl z-50 flex flex-col">

          {/* Header */}
          <div className="flex justify-between items-center border-b border-slate-700 p-5">

            <div>
              <h1 className="text-xl font-bold text-white">
                🤖 Nova AI
              </h1>

              <p className="text-slate-400 text-sm">
                Your Personal Coding Mentor
              </p>
            </div>

            <div className="flex gap-2">

              <button
                onClick={() => {
                  setAnswer("");
                  setMessage("");
                }}
                className="text-xl hover:text-yellow-400 transition"
                title="Clear Chat"
              >
                🗑️
              </button>

              <button
                onClick={() => setOpen(false)}
                className="text-2xl text-slate-400 hover:text-red-400 transition"
                title="Close"
              >
                ✕
              </button>

            </div>

          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">

            <button
              onClick={() =>
                askNova("Explain this problem in simple words.")
              }
              className="w-full bg-slate-800 hover:bg-slate-700 rounded-lg p-3 transition"
            >
              💡 Explain Problem
            </button>

            <button
              onClick={() =>
                askNova("Give me a hint without revealing the answer.")
              }
              className="w-full bg-slate-800 hover:bg-slate-700 rounded-lg p-3 transition"
            >
              🧠 Give Hint
            </button>

            <button
              onClick={() =>
                askNova("Find bugs in my code.")
              }
              className="w-full bg-slate-800 hover:bg-slate-700 rounded-lg p-3 transition"
            >
              🐞 Find Bug
            </button>

            <button
              onClick={() =>
                askNova("Optimize my solution.")
              }
              className="w-full bg-slate-800 hover:bg-slate-700 rounded-lg p-3 transition"
            >
              ⚡ Optimize Code
            </button>

            <textarea
              placeholder="Ask Nova anything..."
              className="w-full h-28 bg-slate-800 rounded-lg p-3 outline-none resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              onClick={() => askNova(message)}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg p-3 font-semibold hover:opacity-90 transition"
            >
              Ask Nova
            </button>

            {loading && (
              <div className="text-center text-slate-300 animate-pulse">
                🤖 Nova is thinking...
              </div>
            )}

            {answer && (
              <div className="bg-slate-800 rounded-lg p-4 text-sm leading-7 max-h-80 overflow-y-auto">
                <ReactMarkdown>{answer}</ReactMarkdown>
              </div>
            )}

          </div>

        </div>
      )}
    </>
  );
}