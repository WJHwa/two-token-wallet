import React, { useState, useCallback } from "react";
import Registertb from "./Registertb";
import { useNavigate } from "react-router-dom";

function Register() {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const handleClose = useCallback(() => {
    setShow(false);
  }, [show]);
  const handleShow = useCallback(() => {
    setShow(true);
  }, [show]);

  const redir = () => {
    navigate("/login");
  };
  const noredir = () => {
    navigate("/");
  };
  const container = {
    textAlign: "center",
    backgroundColor: "#171616",
    padding: "20px 0 30px 0",
    margin: "0 0 20px 60px",
    borderRadius: "50px",
    color: "white",
    border: "solid 2px #A0A0A0",
  };
  return (
    <>
      <div className="container" style={container}>
        <Registertb
          handleClose={handleClose}
          handleShow={handleShow}
          redir={redir}
          noredir={noredir}
          show={show}
        />
      </div>
    </>
  );
}

export default Register;
