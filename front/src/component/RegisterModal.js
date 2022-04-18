import React from "react";
import { Button, Modal } from "react-bootstrap";

function RegisterModal({ handleClose, redir, noredir, show }) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>회원가입 완료하였습니다.</Modal.Title>
        </Modal.Header>
        <Modal.Body>바로 로그인 하시겠습니까??</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={noredir}>
            메인으로
          </Button>
          <Button variant="secondary" onClick={redir}>
            로그인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegisterModal;
