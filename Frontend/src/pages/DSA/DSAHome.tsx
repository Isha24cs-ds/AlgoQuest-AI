import { useNavigate } from "react-router-dom";
import WorldNode from "../../components/dsa/WorldNode";

const worlds = [
  {
    title: "Variables Village",
    icon: "🏡",
    unlocked: true,
    current: false,
    route: "/variables",
  },

  {
    title: "Arrays Kingdom",
    icon: "🏰",
    unlocked: true,
    current: true,
    route: "/arrays",
  },

  {
    title: "Strings Forest",
    icon: "🌲",
    unlocked: true,
    current: false,
    route: "/strings",
  },

  {
    title: "Linked List River",
    icon: "🌊",
    unlocked: true,
    current: false,
    route: "/linkedlist",
  },

  {
    title: "Stack Volcano",
    icon: "🌋",
    unlocked: true,
    current: false,
    route: "/stack",
  },

  {
    title: "Queue City",
    icon: "🏙",
    unlocked: true,
    current: false,
    route: "/queue",
  },

  {
    title: "Tree Temple",
    icon: "🌳",
    unlocked: false,
    current: false,
    route: "/tree",
  },

  {
    title: "Graph Galaxy",
    icon: "🌌",
    unlocked: false,
    current: false,
    route: "/graph",
  },
];

function DSAHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="text-center pt-16">

        <h1 className="text-6xl font-bold">

          ⚔ DSA WORLD

        </h1>

        <p className="mt-5 text-slate-400">

          Complete worlds to unlock the next kingdom.

        </p>

      </div>

      <div className="mt-20 flex flex-col items-center">

        {worlds.map((world) => (
          <WorldNode
            key={world.title}
            {...world}
            onClick={() => navigate(world.route)}
          />
        ))}

      </div>

    </div>
  );
}

export default DSAHome;