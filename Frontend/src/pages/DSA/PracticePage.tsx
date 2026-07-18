import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Question {
  id: number;
  title: string;
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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-2xl">
        Loading Questions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        Arrays Practice
      </h1>

      <div className="space-y-5">

        {questions.map((question) => (

          <div
            key={question.id}
            className="bg-slate-900 border border-slate-700 rounded-xl p-6 flex justify-between items-center hover:border-blue-500 transition"
          >

            <div>

              <h2 className="text-2xl font-semibold">
                {question.title}
              </h2>

              <p className="text-green-400 mt-2">
                {question.difficulty}
              </p>

            </div>

            <button
              onClick={() => navigate(`/question/${question.id}`)}
              className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Solve
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}