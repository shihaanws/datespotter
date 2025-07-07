import React from 'react';
import { motion } from 'framer-motion';
import { BUDGETS } from '../data/constants';
import { itemVariants } from '../lib/animation-variants';

interface BudgetSelectorProps {
  selectedBudget: string | null;
  onBudgetChange: (budget: string) => void;
}

export const BudgetSelector: React.FC<BudgetSelectorProps> = ({
  selectedBudget,
  onBudgetChange,
}) => {
  return (
    <motion.div className="space-y-3" variants={itemVariants}>
      <h2 className="text-sm font-semibold text-zinc-300">
        Choose your budget
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {BUDGETS.map((budget) => (
          <motion.button
            key={budget.value}
            onClick={() => onBudgetChange(budget.value)}
            className={`flex items-center gap-3 rounded-xl px-4 py-4 transition-all text-left ${
              selectedBudget === budget.value
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/25'
                : 'bg-zinc-700 text-zinc-200 hover:bg-zinc-600'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-3xl">{budget.emoji}</span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{budget.label}</span>
              <span className="text-xs opacity-80">{budget.description}</span>
              <span className="text-xs opacity-60 mt-1">{budget.priceRange}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};