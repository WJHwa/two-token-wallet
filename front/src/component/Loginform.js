import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

function Loginform({ navigate }) {
  const [value, setvalue] = useState("");
  const [value2, setvalue2] = useState("");

  const onChange = (e) => {
    setvalue(e.target.value);
  };
  const onChange2 = (e) => {
    setvalue2(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let body = {
      id: value,
      password: value2,
    };
    try {
      const res = await axiosInstance.post("/login", body);
      if (res.data.accessToken) {
        let accessToken = res.data.accessToken;
        localStorage.setItem("Tok", accessToken);
        navigate("/wallet");
      } else {
        alert(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const form = {
    margin: "27px 0 0 0",
    color: "black",
  };
  const input = {
    padding: "0 0 0 3px",
    backgroundColor: "transparent",
    color: "white",
  };
  const labal = { margin: "0 0 7px 0", color: "white" };

  const link = {
    textDecoration: "none",
    fontSize: "15px",
    padding: "3px",
    margin: "0 10px 0 10px",
    color: "#202020",
    backgroundColor: "white",
    borderRadius: "27px",
  };
  const button = {
    padding: "20px",
    borderRadius: "37px",
    fontSize: "20px",
    cursor: "pointer",
    backgroundColor: "#E0E0E0",
    color: "black",
    border: "solid 2px #808080",
  };
  const form_group = { margin: "0 100px 0 100px", fontSize: "17px" };
  return (
    <>
      <Form style={form} onSubmit={onSubmit}>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
          style={form_group}
        >
          <Form.Label style={labal}>아이디</Form.Label>
          <Form.Control
            placeholder="  아이디를 입력하세요"
            value={value}
            style={input}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          style={form_group}
        >
          <Form.Label style={labal}>비밀번호</Form.Label>
          <Form.Control
            value={value2}
            type="password"
            placeholder="  Password"
            style={input}
            onChange={onChange2}
          />
        </Form.Group>
        <div style={{ fontSize: "15px", margin: "0 0 25px 0" }}>
          <Link to="#" style={link}>
            아이디 찾기
          </Link>
          <Link to="#" style={link}>
            비밀번호 찾기
          </Link>
          <Link to="#" style={link}>
            회원가입
          </Link>
        </div>
        <Button variant="primary" type="submit" style={button}>
          로그인
        </Button>
      </Form>
    </>
  );
}

export default Loginform;
