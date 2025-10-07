import React from "react";
import "./PageWrapper.css";
interface PageProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  title?: string;
  navigateTo?: string;
  styleHave?: boolean;
}

export const PageWrapper: React.FC<PageProps> = ({ children }) => {
  return <div className="page-wrapper">{children}</div>;
};
