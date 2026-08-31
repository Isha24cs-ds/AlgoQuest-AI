import { Lock, ArrowRight, CheckCircle2 } from "lucide-react";

interface WorldNodeProps {
  title: string;
  icon: string;
  unlocked: boolean;
  current?: boolean;
  difficulty?: string;
  problemCount?: number;
  onClick?: () => void;
}

function WorldNode({
  title,
  icon,
  unlocked,
  current = false,
  difficulty = "Medium",
  problemCount = 15,
  onClick,
}: WorldNodeProps) {
  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case "easy":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "hard":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={onClick}
        disabled={!unlocked}
        className={`leetcode-card w-full text-left rounded-xl p-6 border transition-all duration-200 flex flex-col justify-between h-56 ${
          unlocked
            ? current
              ? "bg-white border-blue-500 ring-2 ring-blue-500/20 shadow-md"
              : "bg-white border-slate-200 hover:border-blue-400 hover:shadow-md"
            : "bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed"
        }`}
      >
        <div>
          {/* Top Row: Icon & Difficulty */}
          <div className="flex items-center justify-between">
            <div className="h-12 w-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl">
              {icon}
            </div>
            
            {unlocked ? (
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${getDifficultyColor(difficulty)}`}>
                {difficulty}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                <Lock size={12} />
                Locked
              </span>
            )}
          </div>

          {/* Title & Stats */}
          <h3 className="mt-4 font-heading text-lg font-bold text-slate-900 flex items-center justify-between">
            <span>{title}</span>
            {current && <CheckCircle2 size={18} className="text-blue-600" />}
          </h3>

          <p className="text-xs text-slate-500 mt-1 font-medium">
            {problemCount} Interactive Problems
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-400">
            {unlocked ? "Available Track" : "Prerequisite Required"}
          </span>

          <span className={`inline-flex items-center gap-1 text-xs font-bold ${unlocked ? "text-blue-600" : "text-slate-400"}`}>
            <span>{unlocked ? "Solve Module" : "Locked"}</span>
            {unlocked && <ArrowRight size={13} />}
          </span>
        </div>
      </button>
    </div>
  );
}

export default WorldNode;