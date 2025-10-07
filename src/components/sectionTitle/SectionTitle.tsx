import React from "react";
import "./SectionTitle.css";

export const SectionTitle: React.FC = () => {
  return (
    <div className="section-title">
      <div className="section-title__line" />
      <h2 className="section-title__text">Исторические даты</h2>
    </div>
  );
};
