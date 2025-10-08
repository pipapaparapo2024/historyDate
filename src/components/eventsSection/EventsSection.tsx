import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./EventsSection.css";
import { type EventItem } from "../../hooks/useTimelineStore";

interface EventsSectionProps {
  events: EventItem[];
}

export const EventsSection: React.FC<EventsSectionProps> = ({ events }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardWidth = 360;
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [showStartGap, setShowStartGap] = useState(true);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateScrollState = () => {
      const tolerance = 5;
      const atStart = el.scrollLeft <= tolerance;
      const atEnd =
        Math.ceil(el.scrollLeft + el.clientWidth) >=
        el.scrollWidth - tolerance;

      setCanScrollLeft(!atStart);
      setCanScrollRight(!atEnd);
      setShowStartGap(atStart);
    };

    updateScrollState();

    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftStart.current = el.scrollLeft;
    el.style.cursor = "grabbing";
  };

  const stopDragging = () => {
    const el = containerRef.current;
    if (!el) return;
    isDragging.current = false;
    el.style.cursor = "grab";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el || !isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1;
    el.scrollLeft = scrollLeftStart.current - walk;
  };

  const scrollBy = (direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    const delta = direction === "left" ? -cardWidth : cardWidth;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className="events-section">
      {canScrollLeft && (
        <button className="scroll-btn left" onClick={() => scrollBy("left")}>
          <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
            <path d="M8.5 0.75L2.25 7L8.5 13.25" stroke="#42567A" strokeWidth="2" />
          </svg>
        </button>
      )}

      <div
        className={`events-window ${showStartGap ? "start-gap" : ""}`}
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        onMouseMove={onMouseMove}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={events.map((e) => e.year).join("-")}
            className="events-row"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {events.map((e, idx) => (
              <motion.div
                key={idx}
                className="event-card"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
              >
                <div className="event-year">{e.year}</div>
                <div className="event-text">{e.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {canScrollRight && (
        <button className="scroll-btn right" onClick={() => scrollBy("right")}>
          <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
            <path d="M1.5 0.75L7.75 7L1.5 13.25" stroke="#42567A" strokeWidth="2" />
          </svg>
        </button>
      )}
    </div>
  );
};
