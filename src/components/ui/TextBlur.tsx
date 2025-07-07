import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TextBlurProps {
  text: string;
  className?: string;
}

export const TextBlur: React.FC<TextBlurProps> = ({ text, className }) => {
  const words = text.split(' ');

  return (
    <motion.div className={cn('', className)}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: 'easeOut',
          }}
        >
          {word}
          {index < words.length - 1 && ' '}
        </motion.span>
      ))}
    </motion.div>
  );
};