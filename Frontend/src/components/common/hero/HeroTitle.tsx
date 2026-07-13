import { motion } from "framer-motion";

function HeroTitle() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <p className="mb-4 text-blue-400 uppercase tracking-[8px]">
        ⚔️ Welcome to the Battlefield ⚔️
      </p>

      <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">
        Level Up Your
        <br />

        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Preparation Journey
        </span>
      </h1>
    </motion.div>
  );
}

export default HeroTitle;