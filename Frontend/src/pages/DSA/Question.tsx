import { useParams } from "react-router-dom";

const questions = [
  {
    id: "ARR001",
    title: "Largest Element in Array",

    statement:
      "Given an integer array nums, return the largest element.",

    exampleInput:
      "[2,5,8,1]",

    exampleOutput:
      "8",

    constraints:
      "1 <= n <= 100000",
  },

  {
    id: "ARR002",

    title: "Second Largest Element",

    statement:
      "Return the second largest element in the array.",

    exampleInput:
      "[2,5,8,1]",

    exampleOutput:
      "5",

    constraints:
      "1 <= n <= 100000",
  },
];

export default function Question() {

  const { id } = useParams();

  const question = questions.find((q) => q.id === id);

  if (!question) return <h1>Question Not Found</h1>;

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-4xl font-bold">
        {question.title}
      </h1>

      <div className="bg-slate-900 rounded-xl p-8 mt-8">

        <h2 className="text-xl font-semibold">
          Problem Statement
        </h2>

        <p className="mt-4">
          {question.statement}
        </p>

        <h2 className="text-xl font-semibold mt-8">
          Example
        </h2>

        <div className="bg-slate-800 p-5 rounded-lg mt-3">

          <p>
            Input :
            {question.exampleInput}
          </p>

          <p className="mt-3">
            Output :
            {question.exampleOutput}
          </p>

        </div>

        <h2 className="text-xl font-semibold mt-8">
          Constraints
        </h2>

        <p className="mt-4">
          {question.constraints}
        </p>

        <button className="bg-blue-600 px-6 py-3 rounded-lg mt-10">
          🤖 Ask Nova
        </button>

      </div>

    </div>
  );
}