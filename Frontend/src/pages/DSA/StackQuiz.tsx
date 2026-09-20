import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Trophy, RefreshCw, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

const questions = [
  {
    question: "What principle does a Stack data structure follow?",
    options: [
      "FIFO (First In First Out)",
      "LIFO (Last In First Out)",
      "Random Access",
      "Priority-based ordering"
    ],
    answer: 1
  },
  {
    question: "Which operation adds an element to the top of the stack?",
    options: [
      "Pop",
      "Peek",
      "Push",
      "Enqueue"
    ],
    answer: 2
  },
  {
    question: "What does the Pop operation do in a stack?",
    options: [
      "Adds an element at the bottom",
      "Returns the top element without removing it",
      "Removes and returns the top element",
      "Deletes all elements from the stack"
    ],
    answer: 2
  },
  {
    question: "What does the Peek (Top) operation return?",
    options: [
      "The bottom-most element of the stack",
      "The size of the stack",
      "The element at the top without removing it",
      "The element at a random position"
    ],
    answer: 2
  },
  {
    question: "When does a Stack Overflow condition occur?",
    options: [
      "When you try to pop from an empty stack",
      "When you try to push onto a full stack (fixed-size implementation)",
      "When the stack contains duplicate elements",
      "When two stacks are merged"
    ],
    answer: 1
  },
  {
    question: "When does a Stack Underflow condition occur?",
    options: [
      "When push is called on a full stack",
      "When the stack has only one element",
      "When pop or peek is called on an empty stack",
      "When the stack exceeds memory limits"
    ],
    answer: 2
  },
  {
    question: "What is the time complexity of Push and Pop operations in a stack?",
    options: [
      "O(n)",
      "O(log n)",
      "O(n²)",
      "O(1)"
    ],
    answer: 3
  },
  {
    question: "Which is a disadvantage of implementing a stack using a fixed-size array?",
    options: [
      "Push operation takes O(n) time",
      "Maximum size must be defined in advance",
      "Elements cannot be accessed by index",
      "It does not support the Pop operation"
    ],
    answer: 1
  },
  {
    question: "What is a key advantage of implementing a stack using a linked list instead of an array?",
    options: [
      "Faster push and pop operations",
      "No fixed size limit — the stack grows dynamically",
      "Elements are stored in contiguous memory",
      "It supports random access of elements"
    ],
    answer: 1
  },
  {
    question: "Which real-world application commonly uses a stack?",
    options: [
      "CPU job scheduling",
      "Balanced parentheses checking and expression evaluation",
      "Shortest path in a graph",
      "Round-robin task management"
    ],
    answer: 1
  }
];

export default function StackQuiz() {
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
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
        <Navbar />
        <main className="flex justify-center items-center p-8 flex-1">
          <div className="leetcode-panel rounded-2xl p-10 max-w-lg w-full text-center shadow-md border border-slate-200">
            <div className="h-16 w-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <Trophy size={36} />
            </div>

            <h1 className="font-heading text-3xl font-extrabold text-slate-900 mb-2">
              Quiz Completed!
            </h1>

            <p className="text-sm text-slate-500 font-medium mb-6">
              Stack Fundamentals Assessment
            </p>

            <div className="text-5xl font-extrabold text-amber-600 mb-2">
              {score} / {questions.length}
            </div>

            <div className="text-lg font-bold text-slate-700 mb-8">
              Accuracy: {percentage}%
            </div>

            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition"
              >
                <RefreshCw size={18} />
                <span>Retry Assessment</span>
              </button>

              <button
                onClick={() => navigate("/stack")}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition"
              >
                <ArrowLeft size={18} />
                <span>Back to Stacks Track</span>
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 py-10 w-full">
        {/* Progress Bar & Header */}
        <div className="leetcode-panel rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-3">
            <span>Question {current + 1} of {questions.length}</span>
            <span className="text-amber-600">Current Score: {score} XP</span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-amber-500 h-2.5 rounded-full transition-all duration-300"
              style={{
                width: `${((current + 1) / questions.length) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Question Panel */}
        <div className="leetcode-panel rounded-2xl p-8 border border-slate-200">
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 mb-6">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              let style =
                "bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300";

              if (showAnswer) {
                if (index === question.answer) {
                  style = "bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold";
                } else if (index === selected) {
                  style = "bg-rose-50 border-rose-300 text-rose-900 font-semibold";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 text-sm font-medium flex items-center justify-between ${style}`}
                >
                  <span>{option}</span>
                  {showAnswer && index === question.answer && (
                    <CheckCircle2 size={18} className="text-emerald-600" />
                  )}
                  {showAnswer && index === selected && index !== question.answer && (
                    <XCircle size={18} className="text-rose-600" />
                  )}
                </button>
              );
            })}
          </div>

          {showAnswer && (
            <div className="text-center mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={nextQuestion}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-8 py-3 rounded-xl font-bold transition shadow-xs"
              >
                {current === questions.length - 1
                  ? "Finish Assessment 🏆"
                  : "Next Question ➜"}
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
