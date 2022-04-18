import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import RegisterModal from "./RegisterModal";
import axiosInstance from "../utils/axiosInstance";

function Registerform({ handleClose, handleShow, redir, noredir, show }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [address, setAddress] = useState("");

  const onChangeid = (e) => {
    setId(e.target.value);
  };
  const onChangepw = (e) => {
    setPassword(e.target.value);
  };
  const onChangepw2 = (e) => {
    setPassword2(e.target.value);
  };
  const onChangeadd = (e) => {
    setAddress(e.target.value);
  };
  const onChangename = (e) => {
    setName(e.target.value);
  };
  const onChangephone = (e) => {
    setPhone(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (name === "") {
      return alert("이름을 입력해주세요.");
    } else if (password !== password2) {
      return alert("비밀번호를 다시 확인하세요.");
    } else if (password.length < 8) {
      return alert("비밀번호가 너무 짧습니다.");
    } else if (address === "") {
      return alert("지갑주소를 입력해주세요.");
    } else if (phone === "") {
      return alert("연락처를 입력해주세요.");
    } else if (id === "") {
      return alert("아이디를 입력해주세요.");
    }

    let body = {
      name: name,
      id: id,
      password: password,
      address: address,
      phone: phone,
    };

    try {
      const res = await axiosInstance.post("/register", body);
      if (res.data.serverStatus === 2) {
        handleShow();
      } else {
        alert(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /// css ///

  const form = {
    margin: "0 120px 0 120px",
    color: "black",
  };
  const input = {
    padding: "2px 0 2px 10px",
    backgroundColor: "transparent",
    color: "white",
  };
  const labal = { margin: "0 0 5px 0", color: "white" };

  const button = {
    padding: "17px",
    borderRadius: "37px",
    cursor: "pointer",
    backgroundColor: "#E0E0E0",
    color: "black",
    border: "solid 2px #808080",
    margin: "2px 0 0 0",
  };

  const form_group = { margin: "0", fontSize: "15px" };
  return (
    <>
      <Form style={form} onSubmit={onSubmit}>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
          style={form_group}
        >
          <Form.Label style={labal}>이름</Form.Label>
          <Form.Control
            placeholder="  이름을 입력하세요"
            value={name}
            style={input}
            type="text"
            onChange={onChangename}
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
          style={form_group}
        >
          <Form.Label style={labal}>아이디</Form.Label>
          <Form.Control
            placeholder="  아이디를 입력하세요"
            value={id}
            style={input}
            type="text"
            onChange={onChangeid}
          />
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          style={form_group}
        >
          <Form.Label style={labal}>비밀번호</Form.Label>
          <Form.Control
            value={password}
            type="password"
            placeholder="  Password"
            style={input}
            onChange={onChangepw}
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          style={form_group}
        >
          <Form.Label style={labal}>비밀번호 확인</Form.Label>
          <Form.Control
            value={password2}
            type="password"
            placeholder="  Password"
            style={input}
            onChange={onChangepw2}
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          style={form_group}
        >
          <Form.Label style={labal}>연락처</Form.Label>
          <Form.Control
            value={phone}
            type="text"
            placeholder="  '-'빼고 써주세요."
            style={input}
            onChange={onChangephone}
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          style={form_group}
        >
          <Form.Label style={labal}>지갑주소</Form.Label>
          <Form.Control
            value={address}
            type="text"
            placeholder="  Wallet Address"
            style={input}
            onChange={onChangeadd}
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={button}>
          회원가입
        </Button>
      </Form>
      <RegisterModal
        handleClose={handleClose}
        redir={redir}
        noredir={noredir}
        show={show}
      />
    </>
  );
}

export default Registerform;
