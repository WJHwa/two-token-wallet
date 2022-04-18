import React, { useEffect, useState } from "react";
import Background from "./Background";
import Historytable from "./Historytable";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import HistoryPageBt from "./HistoryPageBt";
import axiosInstance from "../utils/axiosInstance";

function History() {
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [perPage] = useState(5);
  const [data, setData] = useState([
    {
      id: "",
      to: "",
      gas: "",
      hash: "",
      date: "",
    },
  ]);

  const navigate = useNavigate();

  const getStart = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/history");
      if (res.data) {
        setData(res.data.result);
        setLoading(false);
      } else {
        console.log(res);
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

  useEffect(() => {
    getStart();
  }, []);

  const indexOfLastP = current * perPage;
  const indexOfFirstP = indexOfLastP - perPage;
  const currentPosts = data.slice(indexOfFirstP, indexOfLastP);

  const Paginate = (p) => setCurrent(p);

  return (
    <>
      <Background />
      <Historytable
        data={currentPosts}
        loading={loading}
        perPage={perPage}
        total={data.length}
        Paginate={Paginate}
      />
      <HistoryPageBt
        perPage={perPage}
        total={data.length}
        Paginate={Paginate}
      />
      <Menu />
    </>
  );
}

export default History;
