import { useParams, useNavigate } from "react-router-dom";
import { stringsLesson } from "../../data/stringsLesson";
import CodeBlock from "../../components/CodeBlock";

export default function StringLesson() {
  const navigate = useNavigate();
  const { id } = useParams();

  const lesson = stringsLesson.find(
    (item) => item.id === Number(id)
  );

  if (!lesson) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Lesson not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-5xl mx-auto p-10">

        <h1 className="text-5xl font-bold mb-2">
          {lesson.icon} {lesson.title}
        </h1>

        <p className="text-slate-400 mb-10">
          {lesson.description}
        </p>

        {lesson.content?.map((section, index) => (
          <div
            key={index}
            className="bg-slate-900 rounded-2xl border border-slate-700 p-8 mb-8"
          >
            <h2 className="text-3xl font-bold mb-5">
              {section.heading}
            </h2>

            {section.text && (
              <p className="text-slate-300 leading-8 text-lg">
                {section.text}
              </p>
            )}

            {section.bullets && (
              <ul className="list-disc ml-6 mt-5 space-y-2 text-slate-300">
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

        {lesson.id === 10 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => navigate("/strings-quiz")}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition duration-300"
            >
              🌲 Now Let's Test You!
            </button>
          </div>
        )}

      </div>

    </div>
  );
}