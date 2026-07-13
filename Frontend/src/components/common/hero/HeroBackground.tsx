import { motion } from "framer-motion";

function HeroBackground() {
  return (
    <>
      {/* Blue Glow */}
      <motion.div
        className="absolute left-20 top-32 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"
        animate={{
          y: [0, -30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
      />

      {/* Purple Glow */}
      <motion.div
        className="absolute bottom-24 right-20 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl"
        animate={{
          y: [0, 30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
        }}
      />
    </>
  );
}

export default HeroBackground;