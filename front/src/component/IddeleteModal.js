import React from "react";
import { Button, Modal } from "react-bootstrap";

function IddeleteModal({ handleClose, redir, show }) {
  const button = {
    border: "solid 2px",
    borderRadius: "30px",
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>지갑 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>지갑을 삭제하시겠습니까??</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" style={button} onClick={redir}>
            지갑삭제
          </Button>
          <Button variant="dark" style={button} onClick={handleClose}>
            취소하기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default IddeleteModal;
