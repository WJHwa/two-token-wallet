import React from "react";
import img from "../img/img.png";

function Background() {
  return (
    <>
      <img
        src={img}
        style={{
          height: "300px",
          width: "100%",
        }}
      ></img>
    </>
  );
}

export default Background;
