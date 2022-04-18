import React from "react";
import AgreeAllCheck from "./AgreeAllCheck";

function AgreeCheck2({
  container,
  checkedInputs,
  changeHandler,
  changeOn,
  navigate,
}) {
  return (
    <>
      <div className="container" style={container}>
        dddddddddddddd dddddddddddddd dddddddddddddd dddddddddddddd
        dddddddddddddd dddddddddddddd dddddddddddddd dddddddddddddd
        dddddddddddddd dddddddddddddd dddddddddddddd dddddddddddddd
        dddddddddddddd dddddddddddddd dddddddddddddd dddddddddddddd
        dddddddddddddd ddddddddddddddㅇㅇㅇㅇ
      </div>
      <input
        type="checkbox"
        onChange={(e) => changeHandler(e.currentTarget.checked, "check2")}
        checked={
          checkedInputs.includes("check2") || checkedInputs.includes("check3")
            ? true
            : false
        }
      ></input>
      <label>개인정보 수집 및 이용 동의 (필수)</label>
      <div style={{ margin: "8px 0 0 0" }}></div>
      <AgreeAllCheck
        container={container}
        checkedInputs={checkedInputs}
        changeHandler={changeHandler}
        changeOn={changeOn}
        navigate={navigate}
      />
    </>
  );
}

export default AgreeCheck2;
