import React, { useState } from "react";
import "./EventsSection.css";
import { type EventItem } from "../../hooks/useTimelineStore";

interface EventsSectionProps {
  events: EventItem[];
}

export const EventsSection: React.FC<EventsSectionProps> = ({ events }) => {
  const visibleCount = 3;
  const [startIndex, setStartIndex] = useState(0);
  const [animDirection, setAnimDirection] = useState<"left" | "right" | null>(null);

  const canScrollLeft = startIndex > 0;
  const canScrollRight = startIndex + visibleCount < events.length;

  const handleScrollLeft = () => {
    if (canScrollLeft) {
      setAnimDirection("left");
      setTimeout(() => {
        setStartIndex((prev) => Math.max(prev - 1, 0));
        setAnimDirection(null);
      }, 250);
    }
  };

  const handleScrollRight = () => {
    if (canScrollRight) {
      setAnimDirection("right");
      setTimeout(() => {
        setStartIndex((prev) => prev + 1);
        setAnimDirection(null);
      }, 250);
    }
  };

  const visibleEvents = events.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="events-section">
      {canScrollLeft && (
        <button className="scroll-btn left" onClick={handleScrollLeft}>
          <span>‹</span>
        </button>
      )}

      <div
        className={`events-row ${
          animDirection === "left"
            ? "slide-left"
            : animDirection === "right"
            ? "slide-right"
            : ""
        }`}
      >
        {visibleEvents.map((e, idx) => (
          <div key={idx} className="event-card">
            <div className="event-year">{e.year}</div>
            <div className="event-text">{e.description}</div>
          </div>
        ))}
      </div>

      {canScrollRight && (
        <button className="scroll-btn right" onClick={handleScrollRight}>
          <span>›</span>
        </button>
      )}
    </div>
  );
};
