import React, { useEffect, useState } from "react";
import Background from "./Background";
import Menu from "./Menu";
import MmtSendform from "./MmtSendform";
import Web3 from "web3/dist/web3.min";
import data from "../data.json";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
let Tx = require("ethereumjs-tx").Transaction;

function MmtSend() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [value, setValue] = useState("");
  const [sendaccount, setSendaccount] = useState("");
  const [balance, setBalance] = useState("");

  let web3 = new Web3(new Web3.providers.HttpProvider(data.provider));

  const privateKey = Buffer.from(data.privatekey, "hex");

  const navigate = useNavigate();

  const onChange = (e) => {
    setAddress(e.target.value);
  };
  const onChange2 = (e) => {
    setValue(e.target.value);
  };

  const account1 = async () => {
    try {
      const res = await axiosInstance.get("/mmtsend");
      if (res.data.address) {
        setName(res.data.name);
        setSendaccount(res.data.address);
        getBalance(res.data.address);
      }
    } catch (err) {
      if (
        err.message === "Request failed with status code 400" ||
        err.message === "Request failed with status code 401"
      ) {
        alert("권한이 없습니다. 로그인 후 이용하시기 바랍니다.");
        navigate("/");
      } else {
        console.log(err);
      }
    }
  };

  const contract = data.contract;

  const ABI = data.ABI;

  const ba = new web3.eth.Contract(ABI, contract);

  const getBalance = async (address) => {
    try {
      let balace = await ba.methods.balanceOf(address).call();
      setBalance(balace.slice(0, 3) + "." + balace.slice(3, 5) + "MMT");
    } catch (err) {
      console.log(err);
    }
  };

  const Sendcontract = async (e) => {
    e.preventDefault();
    const contracts = new web3.eth.Contract(ABI, contract);
    const data = contracts.methods
      .transfer(address, web3.utils.toHex(web3.utils.toWei(value.toString())))
      .encodeABI();

    try {
      await web3.eth.getTransactionCount(sendaccount, (err, txCount) => {
        var rawTransaction = {
          from: sendaccount,
          nonce: web3.utils.toHex(txCount),
          gasPrice: web3.utils.toHex(web3.utils.toWei("10", "Gwei")),
          gasLimit: web3.utils.toHex(50000),
          to: contract,
          data: data,
        };

        let tx = new Tx(rawTransaction, { chain: "ropsten" });
        tx.sign(privateKey);
        let serializedeTx = tx.serialize();
        let raw = "0x" + serializedeTx.toString("hex");

        web3.eth
          .sendSignedTransaction(raw)
          .once("transactionHash", (hash) => {
            alert(
              "입금 완료되었습니다. 거래내역은 최대 5분뒤에 확인하실수 있습니다."
            );
          })
          .once("receipt", async (receipt) => {
            console.log("receipt", receipt);
            const body = {
              hash: receipt.transactionHash,
              gas: receipt.gasUsed,
              to: receipt.to,
              name: name,
            };

            const res = await axiosInstance.post("/mmtsend", body);
            console.log(res);
          })
          .on("error", console.error);
        setValue("");
        setAddress("");
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    account1();
  }, [balance]);

  ///css///
  const container = {
    textAlign: "center",
    backgroundColor: "#171616",
    padding: "20px 0 30px 0",
    margin: "0 0 10px 60px",
    borderRadius: "50px",
    fontSize: "30px",
    color: "white",
    border: "solid 2px #A0A0A0",
  };
  return (
    <>
      <Background />
      <div className="container" style={container}>
        MMT 보내기
        <div style={{ fontSize: "12px", margin: "7px 0 3px 0" }}>
          * 주소와 보내실MMT 를 다시 한번 확인해주세요.
        </div>
        <h3>
          <i className="far fa-copyright"></i> {balance}
        </h3>
        <MmtSendform
          address={address}
          value={value}
          onChange={onChange}
          onChange2={onChange2}
          Sendcontract={Sendcontract}
        />
      </div>
      <Menu />
    </>
  );
}

export default MmtSend;
