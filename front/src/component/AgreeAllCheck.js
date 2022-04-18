import React from "react";
import Agreebutton from "./Agreebutton";

function AgreeAllCheck({ checkedInputs, changeHandler, changeOn, navigate }) {
  return (
    <>
      <input
        type="checkbox"
        onChange={(e) => changeHandler(e.currentTarget.checked, "check3")}
        checked={
          checkedInputs.includes("check1" && "check2" && "check3") ||
          checkedInputs.includes("check1" && "check2")
            ? true
            : false
        }
      ></input>
      <label>회원가입 약관에 모두 동의합니다.</label>
      <Agreebutton
        checkedInputs={checkedInputs}
        changeOn={changeOn}
        navigate={navigate}
      />
    </>
  );
}

export default AgreeAllCheck;
