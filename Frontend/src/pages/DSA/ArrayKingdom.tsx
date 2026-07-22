import { useNavigate } from "react-router-dom";

import {
  BookOpen,
  Brain,
  Swords,
  Crown,
  PlayCircle,
  Coins,
  Heart,
  Award,
} from "lucide-react";

function ArraysKingdom() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Learn Arrays",
      icon: BookOpen,
      route: "/learn-arrays",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Practice Missions",
      icon: PlayCircle,
      route: "/practice",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Quiz",
      icon: Brain,
      route: "/quiz",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Mini Boss",
      icon: Swords,
      route: "/miniboss",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Final Boss",
      icon: Crown,
      route: "/finalboss",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}

      <div className="bg-slate-900 border-b border-slate-800 p-6">
        <h1 className="text-5xl font-bold">
          🏰 Arrays Kingdom
        </h1>

        <p className="text-slate-400 mt-2">
          Master arrays and become interview ready.
        </p>
      </div>

      {/* Progress */}

      <div className="grid md:grid-cols-4 gap-6 px-8 mt-8">

        <div className="bg-slate-900 rounded-2xl p-5">

          <Coins className="text-yellow-400" />

          <h2 className="mt-3 text-2xl font-bold">
            250
          </h2>

          <p>Coins</p>

        </div>

        <div className="bg-slate-900 rounded-2xl p-5">

          <Heart className="text-red-400" />

          <h2 className="mt-3 text-2xl font-bold">
            ❤️❤️❤️
          </h2>

          <p>Hints Left</p>

        </div>

        <div className="bg-slate-900 rounded-2xl p-5">

          <Award className="text-blue-400" />

          <h2 className="mt-3 text-xl font-bold">
            2 / 5
          </h2>

          <p>Problems Solved</p>

        </div>

        <div className="bg-slate-900 rounded-2xl p-5">

          <p className="font-semibold">
            Progress
          </p>

          <div className="bg-slate-800 rounded-full h-3 mt-4">

            <div className="bg-blue-500 h-3 rounded-full w-[40%]" />

          </div>

          <p className="mt-2">
            40%
          </p>

        </div>

      </div>

      {/* AI */}

      <div className="mx-8 mt-10 rounded-3xl border border-blue-600 bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8">

        <h2 className="text-3xl font-bold">
          🤖 Nova
        </h2>

        <p className="mt-5 text-lg leading-8">
          Welcome back!

          <br /><br />

          Today we'll learn Arrays step by step.

          <br /><br />

          If you get stuck while solving any question,
          click <b>Ask Nova</b> and I'll guide you without revealing the complete answer.
        </p>

      </div>

      {/* Cards */}

      <div className="grid lg:grid-cols-3 gap-8 p-8">

        {cards.map((card) => {

          const Icon = card.icon;

          return (

            <button
              key={card.title}
              onClick={() => navigate(card.route)}
              className="rounded-3xl bg-slate-900 border border-slate-700 p-8 hover:border-blue-500 hover:scale-105 transition-all duration-300 text-left"
            >

              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center`}
              >
                <Icon size={30} />
              </div>

              <h2 className="text-2xl font-bold mt-6">
                {card.title}
              </h2>

            </button>

          );

        })}

      </div>

    </div>
  );
}

export default ArraysKingdom;