import React from "react";
import { Form, Button } from "react-bootstrap";

function MmtSendform({ value, address, onChange, onChange2, Sendcontract }) {
  const form = {
    margin: "30px 0 10px 0",
    color: "black",
  };
  const input = {
    padding: "4px 0 4px 5px",
    backgroundColor: "transparent",
    color: "white",
    margin: "0 0 5px 0",
  };
  const labal = { margin: "0 0 5px 0", color: "white" };

  const button = {
    padding: "20px",
    borderRadius: "37px",
    fontSize: "20px",
    cursor: "pointer",
    backgroundColor: "#D3D3D3",
    color: "black",
    border: "solid 2px #808080",
    margin: "10px 0 0 0",
  };
  const form_group = { margin: "0 30px 0 30px", fontSize: "17px" };
  return (
    <>
      <Form style={form} onSubmit={Sendcontract}>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
          style={form_group}
        >
          <Form.Label style={labal}>주소 :</Form.Label>
          <Form.Control
            placeholder="주소를 입력하세요"
            style={input}
            value={address}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          style={form_group}
        >
          <Form.Label style={labal}>MMT :</Form.Label>
          <Form.Control
            placeholder="보내실 MMT"
            style={input}
            value={value}
            onChange={onChange2}
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={button}>
          보내기
        </Button>
      </Form>
    </>
  );
}

export default MmtSendform;
