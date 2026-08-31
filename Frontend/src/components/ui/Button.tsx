import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "glass" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
}

function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 active:scale-[0.98]";

  const sizes = {
    sm: "px-4 py-2 text-xs rounded-lg gap-1.5",
    md: "px-6 py-2.5 text-sm rounded-xl gap-2",
    lg: "px-7 py-3.5 text-base rounded-xl gap-2.5 font-semibold",
  };

  const variants = {
    primary:
      "bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold shadow-sm border border-amber-400/50",

    secondary:
      "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200 shadow-sm",

    glass:
      "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-sm",

    outline:
      "border border-slate-300 text-slate-700 hover:text-slate-900 hover:border-slate-400 hover:bg-slate-50",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;