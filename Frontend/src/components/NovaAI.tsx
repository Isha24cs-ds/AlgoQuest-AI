import { useState } from "react";

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

      setAnswer(data.answer);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-28 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-3xl shadow-2xl"
      >
        🤖
      </button>

      {open && (
        <div className="fixed right-8 bottom-48 w-[420px] bg-slate-900 rounded-xl border border-slate-700 shadow-2xl z-50">

          <div className="p-5 border-b border-slate-700">

            <h1 className="text-xl font-bold">
              Nova AI
            </h1>

            <p className="text-slate-400">
              Your Personal Coding Mentor
            </p>

          </div>

          <div className="p-5 space-y-3">

            <button
              onClick={() =>
                askNova("Explain this problem in simple words.")
              }
              className="w-full bg-slate-800 rounded-lg p-3"
            >
              💡 Explain Problem
            </button>

            <button
              onClick={() =>
                askNova("Give me a hint without revealing the answer.")
              }
              className="w-full bg-slate-800 rounded-lg p-3"
            >
              🧠 Give Hint
            </button>

            <button
              onClick={() =>
                askNova("Find bugs in my code.")
              }
              className="w-full bg-slate-800 rounded-lg p-3"
            >
              🐞 Find Bug
            </button>

            <button
              onClick={() =>
                askNova("Optimize my solution.")
              }
              className="w-full bg-slate-800 rounded-lg p-3"
            >
              ⚡ Optimize
            </button>

            <textarea
              placeholder="Ask Nova anything..."
              className="w-full h-28 bg-slate-800 rounded-lg p-3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              onClick={() => askNova(message)}
              className="w-full bg-violet-600 rounded-lg p-3"
            >
              Ask Nova
            </button>

            {loading && (
              <div className="text-center">
                Thinking...
              </div>
            )}

            {answer && (
              <div className="bg-slate-800 rounded-lg p-4 whitespace-pre-wrap">
                {answer}
              </div>
            )}

          </div>

        </div>
      )}
    </>
  );
}