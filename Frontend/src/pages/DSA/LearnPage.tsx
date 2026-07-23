import { useNavigate, useLocation } from "react-router-dom";

import LessonCard from "../../components/LessonCard";

import { arraysLesson } from "../../data/arraysLesson";
import { stringsLesson } from "../../data/stringsLesson";

export default function LearnPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isStrings = location.pathname === "/learn-strings";

  const lessons = isStrings ? stringsLesson : arraysLesson;

  const title = isStrings
    ? "🌲 Learn Strings"
    : "📚 Learn Arrays";

  const subtitle = isStrings
    ? "Complete every lesson to become a String Master."
    : "Complete every lesson to become an Array Master.";

  const lessonRoute = isStrings
    ? "/learn-strings"
    : "/learn-arrays";

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="p-10">

        <h1 className="text-5xl font-bold">
          {title}
        </h1>

        <p className="text-slate-400 mt-3">
          {subtitle}
        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-8 px-10 pb-10">

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

    </div>
  );
}