import {
  Code2,
  Brain,
  Trophy,
  BookOpen,
  ArrowRight,
  Swords,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const journeys = [
  {
    title: "Placement Preparation",
    description: "Master DSA, Aptitude & Core Subjects",
    icon: Trophy,
    color: "from-yellow-500 to-orange-500",
    route: "/dsa",
  },
  {
    title: "Full Stack Developer",
    description: "React • Node • MongoDB • Projects",
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
    route: "/fullstack",
  },
  {
    title: "AI & Machine Learning",
    description: "Deep Learning • LLMs • Python",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    route: "/ai",
  },
  {
    title: "Core CS Subjects",
    description: "OS • DBMS • CN • OOP",
    icon: BookOpen,
    color: "from-green-500 to-emerald-500",
    route: "/corecs",
  },
];

export default function JourneySelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-16">

      <h1 className="text-6xl font-bold text-center">
        Choose Your Journey
      </h1>

      <p className="text-slate-400 text-center mt-4 text-xl">
        Every legend begins with a single choice.
      </p>

      {/* Main Journey Cards */}

      <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-6xl mx-auto">

        {journeys.map((journey) => {
          const Icon = journey.icon;

          return (
            <div
              key={journey.title}
              className="rounded-3xl bg-slate-900 border border-slate-800 p-8 hover:border-blue-500 hover:scale-105 transition duration-300"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${journey.color} flex items-center justify-center`}
              >
                <Icon size={32} />
              </div>

              <h2 className="text-2xl font-bold mt-6">
                {journey.title}
              </h2>

              <p className="text-slate-400 mt-3">
                {journey.description}
              </p>

              <button
                onClick={() => navigate(journey.route)}
                className="mt-8 flex items-center gap-2 text-blue-400 hover:text-blue-300"
              >
                Enter World
                <ArrowRight size={18} />
              </button>

            </div>
          );
        })}

      </div>

      {/* Competitive Arena */}

      <div className="max-w-6xl mx-auto mt-14">

        <div className="rounded-3xl bg-gradient-to-r from-red-900/30 via-orange-900/20 to-red-900/30 border border-red-500/30 p-10">

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">

            <div>

              <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">

                  <Swords size={34} />

                </div>

                <div>

                  <h2 className="text-4xl font-bold">
                    ⚔️ Competitive Arena
                  </h2>

                  <p className="text-slate-300 mt-2 text-lg">
                    Challenge your friends in real-time coding battles.
                  </p>

                </div>

              </div>

              <div className="flex flex-wrap gap-3 mt-8">

                <span className="bg-slate-800 px-4 py-2 rounded-full">
                  👥 Create Room
                </span>

                <span className="bg-slate-800 px-4 py-2 rounded-full">
                  🚪 Join Room
                </span>

                <span className="bg-slate-800 px-4 py-2 rounded-full">
                  🏆 Live Leaderboard
                </span>

                <span className="bg-slate-800 px-4 py-2 rounded-full">
                  ⏱️ 20 Min Battles
                </span>

              </div>

            </div>

            <div className="mt-8 md:mt-0">

              <span className="bg-red-600 px-4 py-2 rounded-full font-semibold">
                🔴 LIVE
              </span>

            </div>

          </div>

          <button
            onClick={() => navigate("/arena")}
            className="mt-10 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition"
          >
            Enter Arena

            <ArrowRight size={20} />

          </button>

        </div>

      </div>

    </div>
  );
}