import { Terminal, Globe, Share2, Code2, Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-slate-950 font-bold shadow-xs">
                <Terminal size={17} className="stroke-[2.5]" />
              </div>
              <span className="font-heading text-lg font-bold text-slate-900">
                AlgoQuest <span className="text-amber-600 font-extrabold">AI</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 max-w-sm font-medium">
              The next-generation algorithmic learning platform inspired by LeetCode. Master data structures, full stack, system design, and competitive coding.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                All Systems Operational
              </span>
            </div>
          </div>

          {/* Col 1 */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Curricula
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li><a href="/dsa" className="hover:text-amber-600 transition">Data Structures</a></li>
              <li><a href="/journey" className="hover:text-amber-600 transition">Full Stack Prep</a></li>
              <li><a href="/journey" className="hover:text-amber-600 transition">System Design</a></li>
              <li><a href="/journey" className="hover:text-amber-600 transition">AI & Machine Learning</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Arena
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li><a href="/arena" className="hover:text-amber-600 transition">Live Contests</a></li>
              <li><a href="/arena" className="hover:text-amber-600 transition">Global Ranking</a></li>
              <li><a href="/arena" className="hover:text-amber-600 transition">Sprint Battles</a></li>
              <li><a href="/arena" className="hover:text-amber-600 transition">Daily Quests</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Platform
            </h4>
            <div className="flex gap-2.5 text-slate-600">
              <a href="#" className="hover:text-slate-900 transition p-2 rounded-lg bg-slate-100 border border-slate-200" title="Community">
                <Globe size={16} />
              </a>
              <a href="#" className="hover:text-slate-900 transition p-2 rounded-lg bg-slate-100 border border-slate-200" title="Developers">
                <Code2 size={16} />
              </a>
              <a href="#" className="hover:text-slate-900 transition p-2 rounded-lg bg-slate-100 border border-slate-200" title="Share Platform">
                <Share2 size={16} />
              </a>
            </div>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 pt-6 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} AlgoQuest AI. Built for high-performance engineers.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Crafted with precision & <Heart size={12} className="text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

