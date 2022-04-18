import React from "react";
import AgreeCheck2 from "./AgreeCheck2";

function AgreeCheck1({
  container,
  checkedInputs,
  changeHandler,
  changeOn,
  navigate,
}) {
  return (
    <>
      <div className="container" style={container}></div>
      <input
        type="checkbox"
        onChange={(e) => changeHandler(e.currentTarget.checked, "check1")}
        checked={
          checkedInputs.includes("check1") || checkedInputs.includes("check3")
            ? true
            : false
        }
      ></input>
      <label>이용약관 동의 (필수)</label>
      <AgreeCheck2
        container={container}
        checkedInputs={checkedInputs}
        changeHandler={changeHandler}
        changeOn={changeOn}
        navigate={navigate}
      />
    </>
  );
}

export default AgreeCheck1;
