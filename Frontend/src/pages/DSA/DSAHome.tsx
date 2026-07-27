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
    <div className="min-h-screen bg-slate-950 text-white px-6 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold">⚔ DSA WORLD</h1>

        <p className="mt-5 text-lg text-slate-400">
          Complete worlds to unlock the next kingdom.
        </p>
      </div>

      {/* Worlds Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
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