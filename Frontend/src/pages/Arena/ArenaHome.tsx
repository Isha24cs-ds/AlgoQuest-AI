import { Link } from "react-router-dom";
import {
  Swords,
  Brain,
  Code2,
  BookOpen,
  Cpu,
  Users,
} from "lucide-react";

const battles = [
  {
    title: "DSA Battle",
    description: "Compete in Arrays, Strings, Trees, Graphs and more.",
    icon: <Brain size={34} />,
    color: "from-orange-500 to-red-500",
    link: "/arena/dsa",
  },
  {
    title: "Development Battle",
    description: "React, Node.js, Express, SQL, Git challenges.",
    icon: <Code2 size={34} />,
    color: "from-blue-500 to-cyan-500",
    link: "/arena/development",
  },
  {
    title: "AI / ML Battle",
    description: "Python, NumPy, ML, Deep Learning & LLM quizzes.",
    icon: <Cpu size={34} />,
    color: "from-pink-500 to-purple-500",
    link: "/arena/aiml",
  },
  {
    title: "Core CS Battle",
    description: "DBMS, OS, CN & OOP competitive rooms.",
    icon: <BookOpen size={34} />,
    color: "from-green-500 to-emerald-500",
    link: "/arena/core",
  },
];

export default function ArenaHome() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto py-16 px-6">

        <div className="text-center">

          <div className="inline-flex items-center gap-3 bg-red-600 px-5 py-2 rounded-full">

            <Swords />

            <span className="font-semibold">
              Competitive Arena
            </span>

          </div>

          <h1 className="text-6xl font-bold mt-8">
            Battle Your Friends
          </h1>

          <p className="text-slate-400 mt-5 text-xl">
            Create coding rooms, invite friends and compete live.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-16">

          {battles.map((battle) => (

            <Link
              key={battle.title}
              to={battle.link}
              className="bg-slate-900 rounded-3xl border border-slate-800 p-8 hover:scale-105 transition"
            >

              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${battle.color} flex items-center justify-center`}
              >
                {battle.icon}
              </div>

              <h2 className="text-3xl font-bold mt-6">
                {battle.title}
              </h2>

              <p className="text-slate-400 mt-4">
                {battle.description}
              </p>

              <div className="mt-8 flex items-center gap-2 text-blue-400">

                <Users size={20} />

                Create / Join Room →

              </div>

            </Link>

          ))}

        </div>

      </div>

    </div>
  );
}