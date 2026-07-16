import { useNavigate } from "react-router-dom";

const questions = [
  {
    id: "ARR001",
    title: "Largest Element in Array",
    difficulty: "Easy",
  },
  {
    id: "ARR002",
    title: "Second Largest Element",
    difficulty: "Easy",
  },
  {
    id: "ARR003",
    title: "Check if Array is Sorted",
    difficulty: "Easy",
  },
  {
    id: "ARR004",
    title: "Reverse Array",
    difficulty: "Easy",
  },
  {
    id: "ARR005",
    title: "Rotate Array",
    difficulty: "Easy",
  },
];

export default function PracticePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        Arrays Practice
      </h1>

      <div className="space-y-5">

        {questions.map((question) => (

          <div
            key={question.id}
            className="bg-slate-900 border border-slate-700 rounded-xl p-6 flex justify-between items-center"
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
              className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Solve
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}