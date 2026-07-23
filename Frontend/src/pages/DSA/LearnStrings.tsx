import { useNavigate } from "react-router-dom";

import LessonCard from "../../components/LessonCard";

import { stringsLesson } from "../../data/stringsLesson";

export default function LearnStrings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="p-10">

        <h1 className="text-5xl font-bold">
          🌲 Learn Strings
        </h1>

        <p className="text-slate-400 mt-3">
          Complete every lesson to become a String Master.
        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-8 px-10 pb-10">

        {stringsLesson.map((lesson) => (

          <LessonCard
            key={lesson.id}
            icon={lesson.icon}
            title={lesson.title}
            description={lesson.description}
            onClick={() =>
              navigate(`/learn-strings/${lesson.id}`)
            }
          />

        ))}

      </div>

    </div>
  );
}