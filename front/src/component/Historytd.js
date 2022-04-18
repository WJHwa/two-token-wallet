import React from "react";

function Historytd({ data }) {
  const tr = {
    height: "200px",
    textAlign: "center",
    fontSize: "20px",
  };
  return (
    <>
      <tbody>
        {data ? (
          data.map((v, i) => {
            return (
              <tr key={i}>
                <th key={v.toString()}>{v.id}</th>
                <td>{v.to_Hash}</td>
                <td>{v.gas}</td>
                <td>{v.Hash}</td>
                <td>{v.date}</td>
              </tr>
            );
          })
        ) : (
          <tr style={tr}>
            <th></th>
            <td></td>
            <td style={{ padding: "70px 0 0 0" }}>
              거래내역을 불러오는중입니다...
            </td>
            <td></td>
            <td></td>
          </tr>
        )}
      </tbody>
    </>
  );
}

export default Historytd;
