import React, { useEffect, useState } from "react";
import "./CenterBlock.css";
import { YearCircle } from "../yearCircle/YearCircle";
import { YearNavigation } from "../yearNavigation/YearNavigation";
import { useTimelineStore } from "../../hooks/useTimelineStore";

export const CenterBlock: React.FC = () => {
  const { currentIndex, totalPeriods, periods, nextPeriod, prevPeriod, setPeriodByIndex } =
    useTimelineStore();

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
      <span className="year year--left">{currentPeriod.start}</span>

      {/* Круг */}
     <div className="circle-wrapper" style={{ transform: `translate(-50%, -50%)` }}>
  <YearCircle
    totalPeriods={totalPeriods}
    activeIndex={currentIndex}
    rotation={rotation} // передаём угол сюда
    onSelect={(index) => setPeriodByIndex(index)}
    themes={periods.map((p) => p.theme)}
  />
</div>


      <span className="year year--right">{currentPeriod.end}</span>

      {/* Навигация */}
      <div className="nav-wrapper nav-left">
        <div className="counter">
          {String(currentIndex + 1).padStart(2, "0")}/
          {String(totalPeriods).padStart(2, "0")}
        </div>

        <YearNavigation
          onPrev={prevPeriod}
          onNext={nextPeriod}
          disablePrev={currentIndex === 0}
          disableNext={currentIndex === totalPeriods - 1}
        />
      </div>
    </div>
  );
};
