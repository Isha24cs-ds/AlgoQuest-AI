import { Lock } from "lucide-react";

interface WorldNodeProps {
  title: string;
  icon: string;
  unlocked: boolean;
  current?: boolean;
  onClick?: () => void;
}

function WorldNode({
  title,
  icon,
  unlocked,
  current = false,
  onClick,
}: WorldNodeProps) {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onClick}
        disabled={!unlocked}
        className={`relative w-72 rounded-3xl border p-6 transition-all duration-300 ${
          unlocked
            ? "bg-slate-900 border-blue-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]"
            : "bg-slate-900 border-slate-700 opacity-50 cursor-not-allowed"
        }`}
      >
        {/* World Icon */}
        <div className="text-6xl">{icon}</div>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-bold">{title}</h2>

        {/* Status */}
        <div className="mt-5">
          {unlocked ? (
            (
              <span className="rounded-full bg-blue-500/20 px-4 py-2 text-blue-400">
                Enter World
              </span>
            )
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full bg-red-500/20 px-4 py-2 text-red-400">
              <Lock size={18} />
              Locked
            </span>
          )}
        </div>
      </button>
    </div>
  );
}

export default WorldNode;