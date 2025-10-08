import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./CenterBlock.css";
import { YearCircle } from "../yearCircle/YearCircle";
import { YearNavigation } from "../yearNavigation/YearNavigation";
import { useTimelineStore } from "../../hooks/useTimelineStore";

export const CenterBlock: React.FC = () => {
  const {
    currentIndex,
    totalPeriods,
    periods,
    nextPeriod,
    prevPeriod,
    setPeriodByIndex,
  } = useTimelineStore();

  const currentPeriod = periods[currentIndex];
  const [rotation, setRotation] = useState(0);

  // вращение круга при смене периода
  useEffect(() => {
    const anglePerPeriod = 360 / totalPeriods;
    setRotation(-anglePerPeriod * currentIndex);
  }, [currentIndex, totalPeriods]);

  return (
    <div className="center-block">
      {/* Годы */}
      <div className="years">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentPeriod.start}
            className="year year--left"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {currentPeriod.start}
          </motion.span>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.span
            key={currentPeriod.end}
            className="year year--right"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {currentPeriod.end}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Круг */}
      <div
        className="circle-wrapper"
        style={{ transform: `translate(-50%, -50%)` }}
      >
        <YearCircle
          totalPeriods={totalPeriods}
          activeIndex={currentIndex}
          rotation={rotation}
          onSelect={(index) => setPeriodByIndex(index)}
          themes={periods.map((p) => p.theme)}
        />
      </div>

      {/* Навигация */}
      <div className="nav-wrapper nav-left">
        <YearNavigation
          onPrev={prevPeriod}
          onNext={nextPeriod}
          disablePrev={currentIndex === 0}
          disableNext={currentIndex === totalPeriods - 1}
          totalPeriods={totalPeriods}
          currentIndex={currentIndex}
        />
      </div>
    </div>
  );
};
