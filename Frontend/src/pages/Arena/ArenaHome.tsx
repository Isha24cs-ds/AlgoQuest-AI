import { useNavigate } from "react-router-dom";
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
    description:
      "Compete in Arrays, Strings, Trees, Graphs and more.",
    icon: Brain,
    color: "from-orange-500 to-red-500",
    link: "/arena/room/dsa",
  },
  {
    title: "Development Battle",
    description:
      "React, Node.js, Express, SQL, Git challenges.",
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
    link: "/arena/room/development",
  },
  {
    title: "AI / ML Battle",
    description:
      "Python, NumPy, ML, Deep Learning & LLM quizzes.",
    icon: Cpu,
    color: "from-pink-500 to-purple-500",
    link: "/arena/room/aiml",
  },
  {
    title: "Core CS Battle",
    description:
      "DBMS, OS, CN & OOP competitive rooms.",
    icon: BookOpen,
    color: "from-green-500 to-emerald-500",
    link: "/arena/room/core",
  },
];

export default function ArenaHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto py-16 px-6">

        {/* Header */}
        <div className="text-center">

          <div className="inline-flex items-center gap-3 bg-red-600 px-5 py-2 rounded-full">
            <Swords size={22} />

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

        {/* Battle Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">

          {battles.map((battle) => {

            const Icon = battle.icon;

            return (
              <div
                key={battle.title}
                className="bg-slate-900 rounded-3xl border border-slate-800 p-8 hover:border-red-500 hover:scale-105 transition duration-300"
              >

                {/* Icon */}
                <div
                  className={
                    "w-16 h-16 rounded-2xl bg-gradient-to-r " +
                    battle.color +
                    " flex items-center justify-center"
                  }
                >
                  <Icon size={32} />
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold mt-6">
                  {battle.title}
                </h2>

                {/* Description */}
                <p className="text-slate-400 mt-4">
                  {battle.description}
                </p>

                {/* Create / Join */}
                <button
                  onClick={() => navigate(battle.link)}
                  className="mt-8 flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
                >
                  <Users size={20} />

                  Create / Join Room →

                </button>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}