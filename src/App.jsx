import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PkmData from "./pages/PkmData";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pkmData" element={<PkmData />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
