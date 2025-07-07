import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Lightbulb, Star } from "lucide-react";
import { itemVariants } from "../lib/animation-variants";

interface AIInsightsProps {
  explanation: string;
  alternativeOptions?: {
    name: string;
    address: string;
    priceLevel: "$" | "$$" | "$$$";
    tags: string[];
    rating: number;
    description: string;
    whyItMatches: string;
  }[];
}

export const AIInsights: React.FC<AIInsightsProps> = ({
  explanation,
  alternativeOptions,
}) => {
  return (
    <motion.div
      className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl p-4 border border-pink-500/20"
      variants={itemVariants}
    >
      <div className="flex items-start gap-3">
        <Sparkles className="h-5 w-5 text-pink-400 mt-0.5 flex-shrink-0" />
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-semibold text-pink-300 mb-2">
              AI Personalized Insights
            </h3>
            <p className="text-sm text-zinc-300">{explanation}</p>
          </div>

          {alternativeOptions && alternativeOptions.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-yellow-400" />
                <span className="text-xs font-medium text-yellow-400">
                  Alternative Suggestions
                </span>
              </div>
              <ul className="space-y-2 text-xs text-zinc-400">
                {alternativeOptions.slice(0, 3).map((option, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-zinc-800/50 rounded-md p-2 border border-zinc-700/50"
                  >
                    <div>
                      <span className="font-semibold text-pink-300">
                        {option.name}
                      </span>
                      <div className="text-zinc-500 text-[10px] truncate w-40">
                        {option.address}
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-yellow-400 text-xs">
                      <Star className="h-3 w-3" />
                      {option.rating.toFixed(1)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
