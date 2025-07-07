import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search } from 'lucide-react';
import { Button } from './ui/Button';
import { itemVariants } from '../lib/animation-variants';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  onLocationClick: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  onLocationClick,
}) => {
  return (
    <motion.div className="flex gap-2 w-full" variants={itemVariants}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
          placeholder="Search places, cuisines, activities..."
        />
      </div>
      <Button
        variant="secondary"
        size="lg"
        onClick={onLocationClick}
        className="flex items-center gap-2"
      >
        <MapPin className="h-4 w-4" />
        Near Me
      </Button>
    </motion.div>
  );
};