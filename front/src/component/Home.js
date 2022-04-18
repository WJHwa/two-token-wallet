import React from "react";
import Background from "./Background";
import { Link } from "react-router-dom";

function Home() {
  const div = {
    backgroundColor: "black",
    padding: "20px",
    color: "white",
    textAlign: "center",
    fontSize: "20px",
    alignItems: "center",
  };

  const link = {
    padding: "40px",
    borderRadius: "30px",
    backgroundColor: "black",
    border: "solid 2px white",
    color: "white",
    textDecoration: "none",
    margin: "50px 40px 0 40px",
    fontSize: "13px",
  };
  return (
    <div>
      <Background />
      <div style={div}>
        <h3>이더리움 지갑에 오신걸 환영합니다.</h3>
        <h5 style={{ margin: "0 0 80px 0" }}>
          안전하고 쉽게 이용할수 있는 지갑입니다.
        </h5>
        <br />
        <Link to="/login" style={link}>
          로그인{" "}
        </Link>
        <Link to="/register" style={link}>
          회원가입
        </Link>
      </div>
    </div>
  );
}

export default Home;
