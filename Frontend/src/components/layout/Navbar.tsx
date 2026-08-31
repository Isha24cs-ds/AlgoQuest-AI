import { Terminal, Sparkles } from "lucide-react";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        
        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-slate-950 font-bold shadow-xs group-hover:scale-105 transition-transform duration-200">
            <Terminal size={19} className="text-slate-950 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg font-bold tracking-tight text-slate-900 flex items-center gap-1">
              AlgoQuest <span className="text-amber-600 font-extrabold">AI</span>
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
          <a
            href="/"
            className="rounded-full px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-white shadow-xs transition"
          >
            Home
          </a>
          <a
            href="/journey"
            className="rounded-full px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition"
          >
            Explore
          </a>
          <a
            href="/dsa"
            className="rounded-full px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition"
          >
            Problemsets
          </a>
          <a
            href="/arena"
            className="rounded-full px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition flex items-center gap-1.5"
          >
            <span>Contest Arena</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <a
            href="/login"
            className="inline-flex text-xs font-bold text-slate-700 hover:text-slate-900 px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition"
          >
            Log In
          </a>

          <a
            href="/signup"
            className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 px-4 py-2 text-xs font-bold text-slate-950 shadow-xs border border-amber-400/60 transition-all duration-200"
          >
            <Sparkles size={14} className="stroke-[2.5]" />
            <span>Sign Up</span>
          </a>
        </div>

      </div>
    </header>
  );
}

export default Navbar;
