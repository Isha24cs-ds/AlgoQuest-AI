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
      className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-blue-500 hover:scale-[1.02] transition duration-300 text-left"
    >
      <div className="text-5xl">{icon}</div>

      <h2 className="text-2xl font-bold mt-4 text-white">
        {title}
      </h2>

      <p className="text-slate-400 mt-2">
        {description}
      </p>
    </button>
  );
}