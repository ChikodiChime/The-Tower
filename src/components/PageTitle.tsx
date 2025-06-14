"use client";
import { motion } from "framer-motion";

const PageTitle = ({ title }: { title: string }) => {
  return (
    <motion.h1
    className={`lg:text-[120px] md:text-[80px] text-[40px] leading-[1] md:leading-normal text-center  font-bold  text-primary `}
        style={{
          color: "var(--color-primary)",
          letterSpacing: "1.5px",
          textShadow: "0 2px 12px rgba(55,50,46,0.15)",
        }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}.
      </motion.h1>

     
  );
}
export default PageTitle

