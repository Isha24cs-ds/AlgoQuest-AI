import { useNavigate } from "react-router-dom";

import LessonCard from "../../components/LessonCard";

import { arraysLesson } from "../../data/arraysLesson";

export default function LearnPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="p-10">

        <h1 className="text-5xl font-bold">
          📚 Learn Arrays
        </h1>

        <p className="text-slate-400 mt-3">
          Complete every lesson to become an Array Master.
        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-8 px-10 pb-10">

        {arraysLesson.map((lesson) => (

          <LessonCard
            key={lesson.id}
            icon={lesson.icon}
            title={lesson.title}
            description={lesson.description}
            onClick={() =>
              navigate(`/learn-arrays/${lesson.id}`)
            }
          />

        ))}

      </div>

    </div>
  );
}