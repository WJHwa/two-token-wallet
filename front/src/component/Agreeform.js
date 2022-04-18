import React from "react";
import AgreeCheck1 from "./AgreeCheck1";

function Agreeform({ checkedInputs, changeHandler, changeOn, navigate }) {
  const container = {
    border: "solid 2px #A0A0A0",
    padding: "0 0 20px 0",
    margin: "0 70px 10px 70px",
    overflow: "auto",
    height: "120px",
    width: "400px",
    backgroundColor: "white",
    color: "black",
  };
  return (
    <>
      <AgreeCheck1
        container={container}
        checkedInputs={checkedInputs}
        changeHandler={changeHandler}
        changeOn={changeOn}
        navigate={navigate}
      />
    </>
  );
}

export default Agreeform;
