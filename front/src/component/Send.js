import React, { useEffect, useState } from "react";
import Background from "./Background";
import Menu from "./Menu";
import Web3 from "web3/dist/web3.min";
import data from "../data.json";
import Sendform from "./Sendform";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
let Tx = require("ethereumjs-tx").Transaction;

function Send() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [value, setValue] = useState("");
  const [sendaccount, setSendaccount] = useState("");
  const [balance, setBalace] = useState("");

  let web3 = new Web3(new Web3.providers.HttpProvider(data.provider));

  const navigate = useNavigate();

  const onChange = (e) => {
    setAddress(e.target.value);
  };
  const onChange2 = (e) => {
    setValue(e.target.value);
  };

  const account1 = async () => {
    try {
      const res = await axiosInstance.get("/send");
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

  const getBalance = async (addre) => {
    try {
      await web3.eth.getBalance(addre, (error, wei) => {
        if (!error) {
          var balances = web3.utils.fromWei(wei, "ether");
          setBalace(balances + " ETH");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const privateKey = Buffer.from(data.privatekey, "hex");

  const transaction = async (e) => {
    e.preventDefault();
    await web3.eth.getTransactionCount(sendaccount, (err, txCount) => {
      const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: address, // 받을사람주소
        value: web3.utils.toHex(web3.utils.toWei(value.toString(), "ether")), // 이더값
        gasPrice: web3.utils.toHex(web3.utils.toWei("3", "Gwei")), // 가스 가격
        gasLimit: web3.utils.toHex(21000), // 가스 최대 사용량
        // EIP 155 chainId - mainnet: 1, ropsten: 3
        chainId: 3, //네트워크 ID(3=Ropsten Tesetnet)
      };

      let tx = new Tx(txObject, { chain: "ropsten", hardfork: "istanbul" });
      tx.sign(privateKey);
      //객체를 담은 후 제일 중요한 개인키를 이용한 sign이 들어갑니다.
      //이더리움 테스트넷과 메인넷에는 필수로 sign객체를 만들어야하죠.

      const serializedeTx = tx.serialize();
      const raw = "0x" + serializedeTx.toString("hex");

      web3.eth
        .sendSignedTransaction(raw)
        .once("transactionHash", (hash) => {
          alert(
            "입금 완료되었습니다. 거래내역은 최대 5분뒤에 확인하실수 있습니다."
          );
        })
        .once("receipt", async (receipt) => {
          const body = {
            hash: receipt.transactionHash,
            gas: receipt.gasUsed,
            to: receipt.to,
            name: name,
          };

          const res = await axiosInstance.post("/send", body);
        })
        .on("error", console.error);
      setValue("");
      setAddress("");
    });
  };

  useEffect(() => {
    account1();
  }, [balance]);

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
        ETH 보내기
        <div style={{ fontSize: "12px", margin: "7px 0 3px 0" }}>
          * 주소와 보내실ETH를 다시 한번 확인해주세요.
        </div>
        <h4>
          <i className="fab fa-ethereum"></i> {balance}
        </h4>
        <Sendform
          onChange={onChange}
          onChange2={onChange2}
          address={address}
          value={value}
          transaction={transaction}
        />
      </div>
      <Menu />
    </>
  );
}

export default Send;
