"use client";
import { motion } from "framer-motion";
import Tower from "./Tower";

import { towersData } from "../data/dummyData";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Towers = () => {
  return (
    <motion.div
      className="flex flex-col lg:flex-row items-center lg:items-end justify-center gap-20 lg:gap-50 w-full h-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {towersData.map((tower, index) => (
        <motion.div
          key={tower.id}
          className={`relative ${index === 1 ? "top-0" : "lg:top-4"}`}
        >
          <Tower key={tower.id} {...tower} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Towers;
