import React, { useState, useCallback } from "react";
import { Button } from "react-bootstrap";
import Menutoggle from "./Menutoggle";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

function Menu() {
  const [on, setOn] = useState(false);
  const [show, setShow] = useState(false);

  const onClick = () => {
    setOn(true);
  };
  const offClick = () => {
    setOn(false);
  };
  const handleClose = useCallback(() => {
    setShow(false);
  }, [show]);
  const handleShow = useCallback(() => {
    setShow(true);
  }, [show]);

  const redir = () => {
    iddelete();
  };

  const navigate = useNavigate();

  const iddelete = async () => {
    try {
      let res = axiosInstance.delete("/delete");
      if (res.data !== true) {
        alert("지갑삭제중 오류가 걸렸습니다.");
      } else {
        localStorage.clear();
        alert("지갑삭제를 완료했습니다.");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      const res = await axiosInstance.get("/logout");
      alert(res.data);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const button = {
    padding: "40px",
    borderRadius: "30px",
    backgroundColor: "black",
    border: "solid 2px white",
    color: "white",
    cursor: "pointer",
    boxShadow: "1px 4px 0 rgb(0,0,0,0.5)",
    fontSize: "15px",
  };

  return (
    <>
      {on === false ? (
        <div style={{ textAlign: "center", margin: "40px 0 20px 0" }}>
          <Button style={button} onClick={() => onClick()}>
            메뉴
          </Button>
        </div>
      ) : (
        <Menutoggle
          offClick={offClick}
          logout={logout}
          handleClose={handleClose}
          handleShow={handleShow}
          redir={redir}
          show={show}
        />
      )}
    </>
  );
}

export default Menu;
