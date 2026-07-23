import {
  BookOpen,
  Sword,
  Brain,
  Shield,
  Crown,
  Coins,
  Sparkles,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StringsKingdom() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Learn Strings",
      description: "Start your journey through the Strings Forest.",
      icon: BookOpen,
      color: "from-emerald-500 to-green-600",
      route: "/learn-strings",
    },
    {
      title: "Practice Missions",
      description: "Solve coding challenges and earn XP.",
      icon: Sword,
      color: "from-cyan-500 to-blue-600",
      route: "/strings-practice",
    },
    {
      title: "Quiz",
      description: "Test your knowledge.",
      icon: Brain,
      color: "from-purple-500 to-pink-600",
      route: "/strings-quiz",
    },
    {
      title: "Mini Boss",
      description: "Intermediate String Challenge.",
      icon: Shield,
      color: "from-orange-500 to-red-500",
      route: "/strings-mini-boss",
    },
    {
      title: "Final Boss",
      description: "Become the String Master.",
      icon: Crown,
      color: "from-yellow-500 to-orange-600",
      route: "/strings-final-boss",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-8 py-12">

        {/* Header */}

        <div className="flex justify-between items-center mb-12">

          <div>

            <h1 className="text-5xl font-extrabold">
              🌲 Strings Forest
            </h1>

            <p className="text-green-300 mt-3 text-lg">
              Master Strings and unlock the secrets of text processing.
            </p>

          </div>

          <div className="flex gap-4">

            <div className="bg-slate-900 px-5 py-3 rounded-xl flex items-center gap-2">
              <Coins className="text-yellow-400" />
              <span>200</span>
            </div>

            <div className="bg-slate-900 px-5 py-3 rounded-xl flex items-center gap-2">
              <Award className="text-blue-400" />
              <span>Level 1</span>
            </div>

          </div>

        </div>

        {/* Nova */}

        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 mb-12">

          <div className="flex items-center gap-4">

            <Sparkles size={40} />

            <div>

              <h2 className="text-2xl font-bold">
                Nova AI Mentor
              </h2>

              <p className="text-green-100 mt-2">
                Welcome to the Strings Forest! Here you'll learn how
                computers store, manipulate, and search text. Every
                search engine, chat app, and AI assistant depends on
                strings.
              </p>

            </div>

          </div>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {cards.map((card) => {

            const Icon = card.icon;

            return (
              <button
                key={card.title}
                onClick={() => navigate(card.route)}
                className={`bg-gradient-to-br ${card.color} rounded-3xl p-8 text-left hover:scale-105 transition duration-300 shadow-xl`}
              >
                <Icon size={45} className="mb-6" />

                <h2 className="text-2xl font-bold mb-3">
                  {card.title}
                </h2>

                <p className="text-green-100">
                  {card.description}
                </p>

              </button>
            );
          })}

        </div>

      </div>

    </div>
  );
}