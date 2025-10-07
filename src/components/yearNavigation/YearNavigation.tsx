// src/components/yearNavigation/YearNavigation.tsx
import React from "react";
import "./YearNavigation.css";

interface YearNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
}

export const YearNavigation: React.FC<YearNavigationProps> = ({
  onPrev,
  onNext,
  disablePrev = false,
  disableNext = false,
}) => {
  return (
    <div className="year-navigation">
      <button className="nav-btn" onClick={onPrev} disabled={disablePrev} aria-label="prev">
        {/* повернём svg влево */}
        <svg width="10" height="14" viewBox="0 0 10 14" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.49988 0.750001L2.24988 7L8.49988 13.25" stroke="#42567A" strokeWidth="2" />
        </svg>
      </button>

      <button className="nav-btn" onClick={onNext} disabled={disableNext} aria-label="next">
        <svg width="10" height="14" viewBox="0 0 10 14" xmlns="http://www.w3.org/2000/svg" style={{ transform: "rotate(180deg)" }}>
          <path d="M8.49988 0.750001L2.24988 7L8.49988 13.25" stroke="#42567A" strokeWidth="2" />
        </svg>
      </button>
    </div>
  );
};
