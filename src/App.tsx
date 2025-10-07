import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";

export const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};
