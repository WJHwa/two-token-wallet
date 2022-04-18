import React from "react";
import Background from "./Background";
import Loginform from "./Loginform";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const container = {
    textAlign: "center",
    backgroundColor: "#171616",
    padding: "20px 0 30px 0",
    margin: "0 0 20px 60px",
    borderRadius: "50px",
    fontSize: "30px",
    color: "white",
    border: "solid 2px #A0A0A0",
  };
  return (
    <>
      <Background />
      <div className="container" style={container}>
        ㅇ로그인ㅇ
        <Loginform navigate={navigate} />
      </div>
    </>
  );
}

export default Login;
