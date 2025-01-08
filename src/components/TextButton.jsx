import React from "react";
import clsx from "clsx";
import styles from "./TextButton.module.css";

const TextButton = ({
  text,
  onClick,
  isDisabled = false,
  customStyle = {},
}) => {
  const buttonClasses = clsx(styles.btnCustom, {
    [styles.btnDisabled]: isDisabled,
  });

  return (
    <button
      className={buttonClasses}
      style={customStyle}
      onClick={!isDisabled ? onClick : null}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default TextButton;
