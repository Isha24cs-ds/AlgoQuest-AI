import { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    question: "What is a string?",
    options: [
      "A collection of numbers",
      "A sequence of characters",
      "A data structure for graphs",
      "A sorting algorithm",
    ],
    answer: 1,
  },
  {
    question: "What is the index of the first character in a string?",
    options: ["0", "1", "-1", "Depends on language"],
    answer: 0,
  },
  {
    question: "Which function returns the length of a string in C++?",
    options: ["count()", "size()", "length()", "Both size() and length()"],
    answer: 3,
  },
  {
    question: "Which language treats strings as immutable?",
    options: ["Java", "Python", "JavaScript", "All of these"],
    answer: 3,
  },
  {
    question: "Which operator is commonly used for string concatenation in C++?",
    options: ["&", "+", "*", "%"],
    answer: 1,
  },
  {
    question: "What is a palindrome?",
    options: [
      "A sorted string",
      "A reversed string",
      "A string that reads the same forward and backward",
      "A duplicated string",
    ],
    answer: 2,
  },
  {
    question: "What is the time complexity of traversing a string of length n?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    answer: 2,
  },
  {
    question: "Which technique is commonly used for the Longest Substring Without Repeating Characters problem?",
    options: [
      "Binary Search",
      "Sliding Window",
      "Merge Sort",
      "Recursion",
    ],
    answer: 1,
  },
  {
    question: "Two strings with the same characters in different order are called:",
    options: ["Palindromes", "Anagrams", "Prefixes", "Substrings"],
    answer: 1,
  },
  {
    question: "Which data structure is commonly used for character frequency counting?",
    options: ["Queue", "Stack", "Hash Map", "Linked List"],
    answer: 2,
  },
];

export default function StringsQuiz() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  function nextQuestion(index: number) {
    setSelected(index);

    if (index === questions[current].answer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (current + 1 === questions.length) {
        setFinished(true);
      } else {
        setCurrent((prev) => prev + 1);
        setSelected(null);
      }
    }, 700);
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center">

        <h1 className="text-5xl font-bold mb-6">
          🎉 Quiz Completed!
        </h1>

        <h2 className="text-3xl mb-6">
          Score: {score} / {questions.length}
        </h2>

        {score >= 8 ? (
          <p className="text-green-400 text-xl mb-6">
            🏆 Congratulations! You are a String Master!
          </p>
        ) : (
          <p className="text-yellow-400 text-xl mb-6">
            Keep practicing and try again!
          </p>
        )}

        <button
          onClick={() => navigate("/strings")}
          className="px-8 py-4 bg-green-600 rounded-xl font-bold hover:bg-green-700"
        >
          Back to Strings Kingdom
        </button>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        🌲 Strings Quiz
      </h1>

      <div className="mb-4 text-lg">
        Question {current + 1} / {questions.length}
      </div>

      <div className="w-full bg-slate-700 rounded-full h-3 mb-10">
        <div
          className="bg-green-500 h-3 rounded-full"
          style={{
            width: `${((current + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="bg-slate-900 rounded-2xl p-8">

        <h2 className="text-2xl font-semibold mb-8">
          {questions[current].question}
        </h2>

        <div className="grid gap-4">

          {questions[current].options.map((option, index) => (

            <button
              key={index}
              disabled={selected !== null}
              onClick={() => nextQuestion(index)}
              className={`p-4 rounded-xl border transition

                ${
                  selected === null
                    ? "border-slate-600 hover:bg-slate-800"
                    : index === questions[current].answer
                    ? "bg-green-600 border-green-600"
                    : selected === index
                    ? "bg-red-600 border-red-600"
                    : "border-slate-600"
                }
              `}
            >
              {option}
            </button>

          ))}

        </div>

      </div>

    </div>
  );
}