const worlds = [
  "🏡 Variables Village",
  "🏰 Arrays Kingdom",
  "🌲 String Forest",
  "🌊 Linked List River",
  "🌋 Stack Volcano",
  "🏙 Queue City",
  "🌳 Tree Temple",
];

function WorldMap() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-12">
      <h1 className="text-5xl font-bold text-center">
        World Map
      </h1>

      <div className="mt-16 max-w-xl mx-auto space-y-6">
        {worlds.map((world) => (
          <div
            key={world}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500 transition"
          >
            {world}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorldMap;