import React, { useEffect, useState } from "react";
import Background from "./Background";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import Web3 from "web3/dist/web3.min";
import data from "../data.json";
import Walletbalace from "./Walletbalace";
import axiosInstance from "../utils/axiosInstance";

function Wallet() {
  const [address, setAddress] = useState("");
  const [value, setValue] = useState("");
  const [valuem, setValuem] = useState("");

  const navigate = useNavigate();

  let web3 = new Web3(new Web3.providers.HttpProvider(data.provider));

  const getAddress = async () => {
    try {
      const res = await axiosInstance.get("/wallet");
      if (res.data.address) {
        setAddress(res.data.address);
        getBalance(res.data.address);
        getMmtBalace(res.data.address);
      } else {
        alert(res.data);
      }
    } catch (err) {
      if (
        err.message === "Request failed with status code 400" ||
        err.message === "Request failed with status code 401"
      ) {
        alert("권한이 없습니다. 로그인 후 이용하시기 바랍니다.");
        navigate("/");
      } else {
        console.log(err.message);
      }
    }
  };

  const getBalance = async (addre) => {
    try {
      await web3.eth.getBalance(addre, (error, wei) => {
        if (!error) {
          var balance = web3.utils.fromWei(wei, "ether");
          setValue(balance.slice(0, 10) + "...eth");
        } else {
          setValue("주소가 잘못됐습니다.");
        }
      });
    } catch (err) {
      setValue(err);
    }
  };

  const contract = data.contract;

  const ABI = data.ABI;

  const ba = new web3.eth.Contract(ABI, contract);

  const getMmtBalace = async (address) => {
    try {
      let balace = await ba.methods.balanceOf(address).call();
      if (balace) {
        setValuem(balace.slice(0, 3) + "." + balace.slice(3, 5) + "MMT");
      } else {
        setValuem("주소가 잘못됐습니다. 확인하시길 바랍니다.");
      }
    } catch (err) {
      setValuem(err);
    }
  };

  useEffect(() => {
    getAddress();
  }, [address]);
  ////// css ///////
  const container = {
    height: "60px",
    width: "100%",
    backgroundColor: "black",
    borderRadius: "15px",
    margin: "0 0 50px 60px",
    padding: "15px",
    border: "solid 2px white",
    color: "white",
    textAlign: "left",
  };
  return (
    <>
      <Background />
      {address ? (
        <div className="container" style={container}>
          주소 : {address}
        </div>
      ) : (
        <div className="container" style={container}>
          주소가 잘못됐습니다.
        </div>
      )}
      <Walletbalace value={value} valuem={valuem} />
      <Menu />
    </>
  );
}

export default Wallet;
