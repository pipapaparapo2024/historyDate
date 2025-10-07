import React, { type CSSProperties } from "react";

interface PageProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  title?: string;
  navigateTo?: string;
  styleHave?: boolean;
}

export const PageWrapper: React.FC<PageProps> = ({
  children,
  styleHave = true,
}) => {
  const containerStyle: CSSProperties = styleHave
    ? {
        backgroundColor: "green",
        position: "relative",
        margin: "0 160px 0 320px",
        maxWidth: "1440px",
        width: "100%",
        boxSizing: "border-box",
      }
    : {};

  return <div style={containerStyle}>{children}</div>;
};
