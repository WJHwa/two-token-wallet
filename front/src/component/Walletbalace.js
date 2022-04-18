import React from "react";

function Walletbalace({ value, valuem }) {
  const container = {
    backgroundColor: "black",
    borderRadius: "15px",
    height: "60px",
    width: "100%",
    margin: "0 0 15px 60px",
    padding: "15px",
    border: "solid 2px white",
    color: "white",
    textAlign: "left",
  };
  return (
    <>
      <div className="container" style={container}>
        <i className="fab fa-ethereum"></i> 잔액 : {value}
      </div>
      <div className="container" style={container}>
        <i className="far fa-copyright"></i> 잔액 : {valuem}
      </div>
    </>
  );
}

export default Walletbalace;
