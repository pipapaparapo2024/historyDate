import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedYearProps {
  value: number;
  target: number;
}

export const AnimatedYear: React.FC<AnimatedYearProps> = ({ value, target }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (displayValue === target) return;
    let start = displayValue;
    const diff = target - start;
    const duration = 800; // мс
    const stepTime = 30;
    const steps = duration / stepTime;
    let count = 0;

    const timer = setInterval(() => {
      count++;
      const progress = count / steps;
      const newValue = Math.round(start + diff * progress);
      setDisplayValue(newValue);
      if (count >= steps) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <motion.span
      key={displayValue}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="year"
    >
      {displayValue}
    </motion.span>
  );
};
