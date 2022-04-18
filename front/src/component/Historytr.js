import React from "react";
import Historytd from "./Historytd";

function Historytr({ data }) {
  return (
    <>
      {data ? (
        <thead>
          <tr>
            <th style={{ width: "6%" }}>#</th>
            <th style={{ width: "30%" }}>받는 계좌</th>
            <th style={{ width: "11%" }}>gas</th>
            <th style={{ width: "40%" }}>transaction Hash </th>
            <th style={{ width: "25%" }}>time</th>
          </tr>
        </thead>
      ) : (
        <thead>
          <tr>
            <th style={{ width: "3%" }}></th>
            <th style={{ width: "3%" }}></th>
            <th style={{ width: "60%" }}></th>
            <th style={{ width: "3%" }}></th>
            <th style={{ width: "3%" }}></th>
          </tr>
        </thead>
      )}
      <Historytd data={data} />
    </>
  );
}

export default Historytr;
