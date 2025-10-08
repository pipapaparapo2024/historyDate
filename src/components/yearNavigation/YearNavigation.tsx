// src/components/yearNavigation/YearNavigation.tsx
import React from "react";
import "./YearNavigation.css";

interface YearNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
  totalPeriods: number;
  currentIndex: number;
}

export const YearNavigation: React.FC<YearNavigationProps> = ({
  onPrev,
  onNext,
  disablePrev = false,
  disableNext = false,
  totalPeriods,
  currentIndex,
}) => {
  return (
    <div className="year-navigation">
     <div className="block-button">
        <div className="counter">
          {String(currentIndex + 1).padStart(2, "0")}/
          {String(totalPeriods).padStart(2, "0")}
        </div>
        <div className="nav-block">
          <button
            className="nav-btn"
            onClick={onPrev}
            disabled={disablePrev}
            aria-label="prev"
          >
            <svg
              width="10"
              height="14"
              viewBox="0 0 10 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.49988 0.75L2.24988 7L8.49988 13.25"
                stroke="#42567A"
                strokeWidth="2"
              />
            </svg>
          </button>
  
          {/* точки пагинации */}
  
          <button
            className="nav-btn"
            onClick={onNext}
            disabled={disableNext}
            aria-label="next"
          >
            <svg
              width="10"
              height="14"
              viewBox="0 0 10 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.50012 0.75L7.75012 7L1.50012 13.25"
                stroke="#42567A"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
     </div>
      <div className="dots">
        {Array.from({ length: totalPeriods }).map((_, i) => (
          <div
            key={i}
            className={`dot ${i === currentIndex ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};
