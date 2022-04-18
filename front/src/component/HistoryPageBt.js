import React from "react";
import { Button } from "react-bootstrap";

function HistoryPageBt({ perPage, total, Paginate }) {
  const PageNum = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    PageNum.push(i);
  }

  const div = {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    margin: "0 0 10px 0",
  };
  return (
    <div style={div}>
      {PageNum.map((n) => {
        return (
          <Button
            key={n.toString()}
            variant="outline-light"
            onClick={() => Paginate(n)}
            style={{ padding: "0 8px 0 8px" }}
          >
            {n}
          </Button>
        );
      })}
    </div>
  );
}

export default HistoryPageBt;
