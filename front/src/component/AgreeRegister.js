import React, { useState } from "react";
import Background from "./Background";
import Agreeform from "./Agreeform";
import Register from "./Register";
import { useNavigate } from "react-router-dom";

function AgreeRegister() {
  const [checkedInputs, setCheckedInputs] = useState([]);
  const [on, setOn] = useState(false);

  const changeOn = () => {
    setOn(true);
  };

  const navigate = useNavigate();

  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
    }
  };
  const container = {
    textAlign: "center",
    backgroundColor: "#171616",
    padding: "20px 0 30px 0",
    margin: "0 50px 10px 50px",
    borderRadius: "50px",
    color: "white",
    border: "solid 2px #A0A0A0",
  };

  return (
    <>
      <Background />
      {on === false ? (
        <div className="container" style={container}>
          <h3 style={{ margin: "0 0 10px 0" }}>회원가입 약관동의</h3>
          <Agreeform
            checkedInputs={checkedInputs}
            changeHandler={changeHandler}
            changeOn={changeOn}
            navigate={navigate}
          />
        </div>
      ) : (
        <Register />
      )}
    </>
  );
}

export default AgreeRegister;
