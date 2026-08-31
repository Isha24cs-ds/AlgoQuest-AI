import { Users, Code, Globe2 } from "lucide-react";

function HeroStats() {
  const stats = [
    { label: "Active Engineers", value: "5,000+", icon: Users, accent: "bg-blue-50 text-blue-600 border-blue-200" },
    { label: "Interactive Challenges", value: "150+", icon: Code, accent: "bg-amber-50 text-amber-600 border-amber-200" },
    { label: "Learning Domains", value: "16", icon: Globe2, accent: "bg-purple-50 text-purple-600 border-purple-200" },
  ];

  return (
    <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="leetcode-card flex items-center justify-between p-4.5 rounded-xl"
          >
            <div className="flex flex-col text-left">
              <span className="font-heading text-2xl font-bold text-slate-900">
                {stat.value}
              </span>
              <span className="text-xs text-slate-500 font-semibold mt-0.5">
                {stat.label}
              </span>
            </div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg border ${stat.accent}`}>
              <Icon size={18} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default HeroStats;