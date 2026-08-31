import { ArrowRight } from "lucide-react";

type LessonCardProps = {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
};

export default function LessonCard({
  icon,
  title,
  description,
  onClick,
}: LessonCardProps) {
  return (
    <button
      onClick={onClick}
      className="leetcode-card w-full text-left rounded-xl p-6 border border-slate-200 bg-white hover:border-blue-500/50 transition-all flex flex-col justify-between h-48 group shadow-xs"
    >
      <div>
        <div className="h-11 w-11 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl">
          {icon}
        </div>

        <h3 className="font-heading text-lg font-bold mt-4 text-slate-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
          {description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
        <span>Start Lesson</span>
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </button>
  );
}