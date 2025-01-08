import React from "react";

const NotFound = () => {
  return (
    <div
      style={{
        // backgroundColor: "red",
        width: "100%",
        height: "100%",
      }}
    >
      <img
        src="https://media.tenor.com/rHoZr_1Z5iAAAAAM/pokemon-psyduck.gif"
        style={{ maxHeight: "200px", maxWidth: "300px" }}
        alt=""
      />
      <p className="my-2">
        Oh não, parece que não encontramos a página que estava procurando,
        sentimos muito.
      </p>
    </div>
  );
};

export default NotFound;
