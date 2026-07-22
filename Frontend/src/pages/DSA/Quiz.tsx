import { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    question: "What is an array?",
    options: [
      "A collection of different data types",
      "A collection of elements of the same data type",
      "A sorting algorithm",
      "A database"
    ],
    answer: 1
  },
  {
    question: "Arrays store elements in ______ memory.",
    options: [
      "Random",
      "Virtual",
      "Contiguous",
      "Separate"
    ],
    answer: 2
  },
  {
    question: "What is the index of the first element in an array?",
    options: ["0", "1", "-1", "Depends on language"],
    answer: 0
  },
  {
    question: "Which operation has O(1) time complexity in arrays?",
    options: [
      "Traversal",
      "Linear Search",
      "Random Access",
      "Insertion"
    ],
    answer: 2
  },
  {
    question: "Which loop is commonly used to traverse an array?",
    options: [
      "for loop",
      "switch",
      "goto",
      "do-while only"
    ],
    answer: 0
  },
  {
    question: "Binary Search works on:",
    options: [
      "Any array",
      "Sorted array",
      "Linked List",
      "Stack"
    ],
    answer: 1
  },
  {
    question: "Insertion in a fixed-size array usually requires:",
    options: [
      "Sorting",
      "Shifting elements",
      "Hashing",
      "Recursion"
    ],
    answer: 1
  },
  {
    question: "Traversal of an array takes:",
    options: [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n²)"
    ],
    answer: 2
  },
  {
    question: "Which data structure is better if the size changes frequently?",
    options: [
      "Fixed Array",
      "Dynamic Array / Vector",
      "Character Array",
      "Matrix"
    ],
    answer: 1
  },
  {
    question: "Which of these is NOT an array operation?",
    options: [
      "Traversal",
      "Searching",
      "Insertion",
      "Compilation"
    ],
    answer: 3
  }
];

export default function Quiz() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const question = questions[current];

  function handleAnswer(index: number) {
    if (showAnswer) return;

    setSelected(index);
    setShowAnswer(true);

    if (index === question.answer) {
      setScore(score + 1);
    }
  }

  function nextQuestion() {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
      setShowAnswer(false);
    } else {
      setCurrent(questions.length);
    }
  }

  if (current === questions.length) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center p-8">
        <div className="bg-slate-900 rounded-3xl p-10 max-w-xl w-full text-center">

          <h1 className="text-5xl font-bold mb-6">
            🎉 Quiz Complete!
          </h1>

          <p className="text-2xl mb-4">
            Your Score
          </p>

          <div className="text-6xl font-bold text-yellow-400 mb-6">
            {score} / {questions.length}
          </div>

          <div className="text-3xl mb-8">
            {percentage}%
          </div>

          <div className="space-y-4">

            <button
              onClick={() => window.location.reload()}
              className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-bold"
            >
              🔄 Retry Quiz
            </button>

            <button
              onClick={() => navigate("/arrays")}
              className="w-full bg-slate-700 hover:bg-slate-600 py-3 rounded-xl font-bold"
            >
              🏠 Back to Arrays Kingdom
            </button>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-3xl mx-auto p-8">

        <div className="flex justify-between mb-4">
          <span>
            Question {current + 1}/{questions.length}
          </span>

          <span>
            ⭐ Score: {score}
          </span>
        </div>

        <div className="w-full bg-slate-700 rounded-full h-3 mb-8">
          <div
            className="bg-purple-500 h-3 rounded-full transition-all"
            style={{
              width: `${((current + 1) / questions.length) * 100}%`
            }}
          />
        </div>

        <div className="bg-slate-900 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-8">
            {question.question}
          </h2>

          <div className="space-y-4">

            {question.options.map((option, index) => {

              let color =
                "bg-slate-800 hover:bg-slate-700";

              if (showAnswer) {

                if (index === question.answer) {
                  color = "bg-green-600";
                } else if (index === selected) {
                  color = "bg-red-600";
                }

              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`${color} w-full text-left p-4 rounded-xl transition`}
                >
                  {option}
                </button>
              );
            })}

          </div>

          {showAnswer && (

            <div className="text-center mt-8">

              <button
                onClick={nextQuestion}
                className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-xl font-bold"
              >
                {current === questions.length - 1
                  ? "Finish Quiz 🏆"
                  : "Next Question ➜"}
              </button>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}