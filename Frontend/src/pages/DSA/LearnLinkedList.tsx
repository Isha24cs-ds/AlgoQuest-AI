import { useNavigate } from "react-router-dom";
import LessonCard from "../../components/LessonCard";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { linkedListLesson } from "../../data/linkedListLesson";
import { BookOpen } from "lucide-react";

export default function LearnLinkedList() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10 w-full">
        {/* Header */}
        <div className="leetcode-panel rounded-xl p-8 mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 mb-3">
            <BookOpen size={13} />
            <span>Interactive Lessons</span>
          </div>

          <h1 className="font-heading text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Learn Linked Lists Modules
          </h1>

          <p className="text-slate-600 text-sm mt-1 font-medium max-w-2xl">
            Complete step-by-step lessons to master node construction, pointer mechanics, cycle detection, and memory management.
          </p>
        </div>

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {linkedListLesson.map((lesson) => (
            <LessonCard
              key={lesson.id}
              icon={lesson.icon}
              title={lesson.title}
              description={lesson.description}
              onClick={() =>
                navigate(`/learn-linkedlist/${lesson.id}`)
              }
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
