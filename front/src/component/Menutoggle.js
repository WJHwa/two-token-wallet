import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import IddeleteModal from "./IddeleteModal";

function Menutoggle({
  offClick,
  logout,
  handleClose,
  handleShow,
  redir,
  show,
}) {
  ////// css //////
  const link = {
    padding: "25px",
    borderRadius: "30px",
    backgroundColor: "#404040",
    border: "solid 2px white",
    color: "white",
    textDecoration: "none",
    margin: "0 2px 0 18px",
    fontSize: "13px",
  };
  const logoutBn = {
    padding: "24px 25px 22px 25px",
    borderRadius: "30px",
    backgroundColor: "#404040",
    border: "solid 2px white",
    color: "white",
    fontSize: "13px",
    cursor: "pointer",
    margin: "40px 20px 7px 15px",
  };
  const deletBn = {
    padding: "24px 25px 22px 25px",
    borderRadius: "30px",
    backgroundColor: "#404040",
    border: "solid 2px white",
    color: "red",
    fontSize: "13px",
    cursor: "pointer",
    margin: "40px 20px 7px 0",
  };
  const button = {
    padding: "30px",
    borderRadius: "30px",
    backgroundColor: "black",
    border: "solid 2px white",
    color: "white",
    cursor: "pointer",
    boxShadow: "1px 4px 0 rgb(0,0,0,0.5)",
    fontSize: "15px",
    margin: "44px 20px 7px 0",
  };
  return (
    <div style={{ textAlign: "center", margin: "45px 0 20px 0" }}>
      <Link to="/wallet" style={link}>
        {" "}
        지갑{" "}
      </Link>
      <Link to="/send" style={link}>
        ETH이체
      </Link>
      <Link to="/mmtsend" style={link}>
        MMT이체
      </Link>
      <Link to="/history" style={link}>
        거래내역
      </Link>
      <br />
      <Button style={logoutBn} onClick={() => logout()}>
        로그아웃
      </Button>
      <Button style={button} onClick={() => offClick()}>
        메뉴닫기
      </Button>
      <Button style={deletBn} onClick={() => handleShow()}>
        지갑삭제
      </Button>
      <IddeleteModal
        handleClose={handleClose}
        handleShow={handleShow}
        redir={redir}
        show={show}
      />
    </div>
  );
}

export default Menutoggle;
