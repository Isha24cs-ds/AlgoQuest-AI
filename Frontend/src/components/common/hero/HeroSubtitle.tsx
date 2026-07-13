import { motion } from "framer-motion";

function HeroSubtitle() {
  return (
    <motion.p
      className="mt-8 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      Learn Data Structures, Full Stack Development,
      Artificial Intelligence, System Design,
      Machine Learning and more through
      immersive worlds, coding battles,
      AI mentorship and real-world projects.
    </motion.p>
  );
}

export default HeroSubtitle;