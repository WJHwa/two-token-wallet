import React from "react";
import Historytr from "./Historytr";
import { Table } from "react-bootstrap";

function Historytable({ data, loading, perPage, total, Paginate }) {
  const container = {
    textAlign: "center",
    backgroundColor: "#171616",
    padding: "20px 0 30px 0",
    margin: "0 30px 10px 30px",
    borderRadius: "50px",
    color: "white",
    border: "solid 2px #A0A0A0",
  };
  const table = {
    tableLayout: "fixed",
    wordWrap: "break-word",
    fontSize: "13px",
  };
  return (
    <div style={container}>
      <h2 style={{ margin: "0 0 15px 0" }}>거래내역</h2>
      <Table striped bordered hover variant="dark" style={table}>
        <Historytr data={data} loading={loading} />
      </Table>
    </div>
  );
}

export default Historytable;
