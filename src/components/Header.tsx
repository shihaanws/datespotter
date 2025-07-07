import React from "react";
import { motion } from "framer-motion";
import { AnimatedShinyText } from "./ui/AnimatedShinyText";
import { TextBlur } from "./ui/TextBlur";
import { Heart } from "lucide-react";
import { itemVariants } from "../lib/animation-variants";
import logo from "../../public/logo.png"; // Adjust the path as necessary
export const Header: React.FC = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center space-y-4"
      variants={itemVariants}
    >
      <div className="flex w-fit items-center justify-center rounded-full bg-zinc-800/80 border border-zinc-700 text-center">
        <AnimatedShinyText className="px-4 py-2 text-sm">
          <span>✨ AI-Powered Date Discovery</span>
        </AnimatedShinyText>
      </div>

      <motion.div className="flex items-center gap-2" variants={itemVariants}>
        <div className="flex items-center justify-center rounded-full  shadow-inner">
          <img src={logo} className="w-24 h-20" />{" "}
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
          DateSpotter
        </h1>
      </motion.div>

      <motion.div variants={itemVariants} className="text-center max-w-2xl">
        <TextBlur
          className="text-3xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent"
          text="Uncover Your Next Unforgettable Date Experience"
        />
        <p className="mt-4 text-lg text-zinc-400 max-w-xl mx-auto">
          Discover handpicked experiences and perfect venues tailored to your
          mood, preferences, and budget with AI-powered recommendations.
        </p>
      </motion.div>
    </motion.div>
  );
};
