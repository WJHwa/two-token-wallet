import React from "react";
import Registerform from "./Registerform";

function Registertb({ handleClose, handleShow, redir, noredir, show }) {
  return (
    <>
      <h2 style={{ margin: "0 0 14px 0" }}>회원가입</h2>
      <Registerform
        handleClose={handleClose}
        handleShow={handleShow}
        redir={redir}
        noredir={noredir}
        show={show}
      />
    </>
  );
}

export default Registertb;
