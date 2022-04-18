import React from "react";
import { Route, Routes } from "react-router-dom";
import AgreeRegister from "./component/AgreeRegister";
import History from "./component/History";
import Home from "./component/Home";
import Login from "./component/Login";
import MmtSend from "./component/MmtSend";
import Send from "./component/Send";
import Wallet from "./component/Wallet";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<AgreeRegister />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/send" element={<Send />} />
      <Route path="/mmtsend" element={<MmtSend />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
}

export default App;
