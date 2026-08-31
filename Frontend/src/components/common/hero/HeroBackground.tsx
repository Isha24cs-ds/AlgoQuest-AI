import { motion } from "framer-motion";

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Light Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-70" />

      {/* Subtle Light Glow */}
      <motion.div
        className="absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.1, 0.2],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export default HeroBackground;
