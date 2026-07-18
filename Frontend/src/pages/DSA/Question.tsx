import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CodeEditor from "../../components/CodeEditor";

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
  const { id } = useParams();

  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("cpp");

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/questions/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch question");
        }

        const result = await response.json();
        setQuestion(result.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestion();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-3xl">
        Loading...
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-500 text-3xl">
        Question Not Found
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-950 text-white">

      <div className="grid grid-cols-2 h-full">

        {/* LEFT PANEL */}

        <div className="overflow-y-auto border-r border-slate-800 p-8">

          <h1 className="text-4xl font-bold">
            {question.title}
          </h1>

          <span className="inline-block mt-3 bg-green-600 px-4 py-1 rounded-full text-sm">
            {question.difficulty}
          </span>

          {/* Statement */}

          <section className="mt-10">

            <h2 className="text-2xl font-bold mb-4">
              Problem Statement
            </h2>

            <p className="text-slate-300 leading-8">
              {question.statement}
            </p>

          </section>

          {/* Example */}

          <section className="mt-10">

            <h2 className="text-2xl font-bold mb-4">
              Example
            </h2>

            <div className="bg-slate-900 rounded-xl p-5 border border-slate-700">

              <p>
                <strong>Input:</strong>
              </p>

              <pre className="text-blue-400 mt-2">
                {question.example.input}
              </pre>

              <p className="mt-5">
                <strong>Output:</strong>
              </p>

              <pre className="text-green-400 mt-2">
                {question.example.output}
              </pre>

              <p className="mt-5">
                <strong>Explanation:</strong>
              </p>

              <p className="text-slate-300 mt-2">
                {question.example.explanation}
              </p>

            </div>

          </section>

          {/* Constraints */}

          <section className="mt-10">

            <h2 className="text-2xl font-bold mb-4">
              Constraints
            </h2>

            <ul className="list-disc ml-6 space-y-3">

              {question.constraints.map((constraint, index) => (

                <li key={index}>
                  {constraint}
                </li>

              ))}

            </ul>

          </section>

          {/* Hints */}

          <section className="mt-10 mb-20">

            <h2 className="text-2xl font-bold mb-4">
              Hints
            </h2>

            <div className="space-y-4">

              {question.hints.map((hint, index) => (

                <div
                  key={index}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-4"
                >
                  💡 {hint}
                </div>

              ))}

            </div>

          </section>

        </div>

        {/* RIGHT PANEL */}

        <div className="flex flex-col h-full">

          {/* Toolbar */}

          <div className="flex justify-between items-center px-6 py-4 border-b border-slate-800">

            <h2 className="text-xl font-bold">
              Code Editor
            </h2>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2"
            >
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
            </select>

          </div>

          {/* Editor */}

          <div className="flex-1 overflow-hidden">
            <CodeEditor />
          </div>

          {/* Bottom Buttons */}

          <div className="flex justify-end gap-4 p-5 border-t border-slate-800">

            <button
              className="bg-yellow-500 hover:bg-yellow-600 px-8 py-3 rounded-lg font-semibold transition"
            >
              ▶ Run
            </button>

            <button
              className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-semibold transition"
            >
              ✓ Submit
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}