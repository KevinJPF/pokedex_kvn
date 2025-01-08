import React from "react";
import styles from "./PkmData.module.css";
import { useLocation } from "react-router-dom";

const PkmData = () => {
  const location = useLocation();
  const pkmData = location.state ?? {};

  return (
    <div>
      <img
        src={pkmData.sprites.other["official-artwork"].front_default}
        alt=""
      />
    </div>
  );
};

export default PkmData;
