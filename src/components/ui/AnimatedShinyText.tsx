import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface AnimatedShinyTextProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedShinyText: React.FC<AnimatedShinyTextProps> = ({
  children,
  className,
}) => {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent',
        className
      )}
      initial={{ backgroundPosition: '0% 50%' }}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        backgroundSize: '200% 100%',
      }}
    >
      {children}
    </motion.div>
  );
};