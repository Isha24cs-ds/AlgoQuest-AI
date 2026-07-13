import { Sparkles, Code2, Brain, Trophy, BookOpen, ArrowRight } from "lucide-react";

const journeys = [
  {
    title: "Placement Preparation",
    description: "Master DSA, Aptitude & Core Subjects",
    icon: Trophy,
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Full Stack Developer",
    description: "React • Node • MongoDB • Projects",
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "AI & Machine Learning",
    description: "Deep Learning • LLMs • Python",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Core CS Subjects",
    description: "OS • DBMS • CN • OOP",
    icon: BookOpen,
    color: "from-green-500 to-emerald-500",
  },
];

function JourneySelection() {
  return (
    <div className="min-h-screen bg-slate-950 text-white px-8 py-12">
      <h1 className="text-5xl font-bold text-center">
        Choose Your Journey
      </h1>

      <p className="text-slate-400 text-center mt-4">
        Every legend begins with a single choice.
      </p>

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

              <button className="mt-8 flex items-center gap-2 text-blue-400 hover:text-blue-300">
                Enter World
                <ArrowRight size={18} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default JourneySelection;