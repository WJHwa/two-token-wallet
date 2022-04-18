import React from "react";
import { Button } from "react-bootstrap";

function Agreebutton({ checkedInputs, changeOn, navigate }) {
  const onclick = () => {
    if (checkedInputs.length === 2 || checkedInputs[0] === "check3") {
      changeOn();
    } else {
      alert("약관동의를 해주셔야합니다.");
    }
  };
  const onclick2 = () => {
    navigate("/");
  };
  const button = {
    padding: "13px",
    borderRadius: "37px",
    cursor: "pointer",
    backgroundColor: "#E0E0E0",
    color: "black",
    border: "solid 2px #808080",
    margin: "15px 15px 10px 15px",
  };

  return (
    <>
      <br />
      <Button style={button} onClick={() => onclick2()}>
        취소하기
      </Button>
      <Button style={button} onClick={() => onclick()}>
        회원가입
      </Button>
    </>
  );
}

export default Agreebutton;
