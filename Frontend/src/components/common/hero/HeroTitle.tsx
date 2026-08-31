import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

function HeroTitle() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center"
    >
      {/* LeetCode Amber Pill Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 shadow-xs">
        <Sparkles size={14} className="text-amber-600 fill-amber-500" />
        <span className="text-xs font-bold tracking-wide text-amber-800 uppercase">
          AI-Powered Algorithmic Platform
        </span>
      </div>

      <h1 className="font-heading text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl md:text-7xl leading-[1.15]">
        Master Algorithms with
        <br />
        <span className="bg-gradient-to-r from-amber-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Intelligent AI Mentorship
        </span>
      </h1>
    </motion.div>
  );
}

export default HeroTitle;
