import React from "react";
import "./YearCircle.css";

interface YearCircleProps {
  totalPeriods: number;
  activeIndex: number;
  rotation?: number; // угол в градусах
  onSelect?: (index: number) => void;
  themes: string[];
}

export const YearCircle: React.FC<YearCircleProps> = ({
  totalPeriods,
  activeIndex,
  rotation = 0,
  onSelect,
  themes,
}) => {
  const radius = 250;
  const center = 265;
  const angleStep = (2 * Math.PI) / totalPeriods;
  const rotationRad = (rotation * Math.PI) / 180;

  return (
    <div className="year-circle-container">
      <svg
        className="year-circle"
        width="530"
        height="530"
        viewBox="0 0 530 530"
      >
        <circle cx={center} cy={center} r={radius} className="circle-base" />

        {Array.from({ length: totalPeriods }).map((_, i) => {
          const angle = i * angleStep - Math.PI / 2 + rotationRad;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          const theme = themes[i];
          const isActive = i === activeIndex;

          return (
            <g
              key={i}
              className={`circle-dot ${isActive ? "active" : ""}`}
              onClick={() => onSelect?.(i)}
              style={{ cursor: "pointer", transition: "all 0.8s ease" }}
            >
              <circle
                cx={x}
                cy={y}
                r={isActive ? 20 : 6}
                className={`dot-circle ${isActive ? "dot-active" : ""}`}
              />

              {/* цифра периода */}
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                className="dot-label"
              >
                {i + 1}
              </text>

              {/* тема только для активной точки */}
              {isActive && (
                <text
                  x={x + 35}
                  y={y + 4}
                  textAnchor="start"
                  className="dot-theme"
                >
                  {theme}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
