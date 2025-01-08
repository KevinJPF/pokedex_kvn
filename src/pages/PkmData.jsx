import React from "react";
import styles from "./PkmData.module.css";
import { useLocation } from "react-router-dom";

const PkmData = () => {
  const location = useLocation();
  const pkmData = location.state ?? {};

  return <div>{pkmData.name}</div>;
};

export default PkmData;
