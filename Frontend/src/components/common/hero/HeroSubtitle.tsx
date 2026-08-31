import { motion } from "framer-motion";

function HeroSubtitle() {
  return (
    <motion.p
      className="mt-6 max-w-2xl text-base text-slate-600 sm:text-lg md:text-xl leading-relaxed font-medium"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      Accelerate your software engineering career. Learn Data Structures,
      System Design, Full Stack, and AI through real-time competitive battles,
      interactive visualizer worlds, and automated code analysis.
    </motion.p>
  );
}

export default HeroSubtitle;