import React from "react";
import styles from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PkmData from "./pages/PkmData";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div>
      <div className={styles.header}>Pokedex - Kevin J.</div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pkmData" element={<PkmData />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
