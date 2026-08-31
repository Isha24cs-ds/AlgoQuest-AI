import { useNavigate, useLocation } from "react-router-dom";
import LessonCard from "../../components/LessonCard";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { arraysLesson } from "../../data/arraysLesson";
import { stringsLesson } from "../../data/stringsLesson";
import { BookOpen } from "lucide-react";

export default function LearnPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isStrings = location.pathname === "/learn-strings";
  const lessons = isStrings ? stringsLesson : arraysLesson;

  const title = isStrings
    ? "Learn Strings Modules"
    : "Learn Arrays Modules";

  const subtitle = isStrings
    ? "Complete step-by-step lessons to master string processing and pattern matching."
    : "Complete step-by-step lessons to master contiguous array manipulation.";

  const lessonRoute = isStrings
    ? "/learn-strings"
    : "/learn-arrays";

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10 w-full">
        {/* Header */}
        <div className="leetcode-panel rounded-xl p-8 mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 mb-3">
            <BookOpen size={13} />
            <span>Interactive Lessons</span>
          </div>

          <h1 className="font-heading text-3xl font-extrabold text-slate-900 sm:text-4xl">
            {title}
          </h1>

          <p className="text-slate-600 text-sm mt-1 font-medium max-w-2xl">
            {subtitle}
          </p>
        </div>

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              icon={lesson.icon}
              title={lesson.title}
              description={lesson.description}
              onClick={() =>
                navigate(`${lessonRoute}/${lesson.id}`)
              }
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}