import { useParams, useNavigate } from "react-router-dom";
import { arraysLesson } from "../../data/arraysLesson";
import CodeBlock from "../../components/CodeBlock";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";

export default function Lesson() {
  const navigate = useNavigate();
  const { id } = useParams();

  const lesson = arraysLesson.find(
    (item) => item.id === Number(id)
  );

  if (!lesson) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
        <Navbar />
        <div className="flex items-center justify-center p-20 text-slate-500 font-semibold">
          Lesson not found.
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-10 w-full">
        {/* Lesson Header */}
        <div className="leetcode-panel rounded-xl p-8 mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 mb-3">
            <BookOpen size={13} />
            <span>Lesson {lesson.id} of {arraysLesson.length} • Array Modules</span>
          </div>

          <h1 className="font-heading text-3xl font-extrabold text-slate-900 sm:text-4xl">
            {lesson.icon} {lesson.title}
          </h1>

          <p className="text-slate-600 text-sm mt-2 font-medium">
            {lesson.description}
          </p>
        </div>

        {/* Content Sections */}
        {lesson.content?.map((section, index) => (
          <div
            key={index}
            className="leetcode-panel rounded-xl border border-slate-200 bg-white p-8 mb-6 shadow-xs"
          >
            <h2 className="font-heading text-xl font-bold text-slate-900 mb-4">
              {section.heading}
            </h2>

            {section.text && (
              <p className="text-slate-700 leading-relaxed text-sm font-normal">
                {section.text}
              </p>
            )}

            {section.bullets && (
              <ul className="list-disc ml-5 mt-4 space-y-2 text-slate-700 text-sm font-normal">
                {section.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            )}

            {section.code && (
              <div className="mt-6">
                <CodeBlock code={section.code} />
              </div>
            )}
          </div>
        ))}

        {/* Navigation / Completion CTA */}
        <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-200">
          <button
            onClick={() => navigate("/learn-arrays")}
            className="px-5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            ← Back to Lessons
          </button>

          {lesson.id < 10 ? (
            <button
              onClick={() => navigate(`/learn-arrays/${lesson.id + 1}`)}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 transition"
            >
              <span>Next Lesson</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={() => navigate("/quiz")}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold text-xs shadow-xs border border-amber-400 flex items-center gap-2 transition"
            >
              <Sparkles size={16} className="fill-slate-950 stroke-[2.5]" />
              <span>Test Your Knowledge!</span>
            </button>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}