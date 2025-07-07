import React from 'react';
import { motion } from 'framer-motion';
import { MOODS } from '../data/constants';
import { itemVariants } from '../lib/animation-variants';

interface MoodSelectorProps {
  selectedMood: string | null;
  onMoodChange: (mood: string) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  selectedMood,
  onMoodChange,
}) => {
  return (
    <motion.div className="space-y-3" variants={itemVariants}>
      <h2 className="text-sm font-semibold text-zinc-300">
        Find the right vibe
      </h2>
      <div className="flex space-x-3 overflow-x-auto py-2 scrollbar-hide">
        {MOODS.map((mood) => (
          <motion.button
            key={mood.value}
            onClick={() => onMoodChange(mood.value)}
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 transition-all ${
              selectedMood === mood.value
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/25'
                : 'bg-zinc-700 text-zinc-200 hover:bg-zinc-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl">{mood.emoji}</span>
            <span className="text-sm font-medium">{mood.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};