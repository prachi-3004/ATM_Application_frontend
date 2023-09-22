import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

const BalanceCheckPage = () => {
  const [account, setAccount] = useState([]);
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login")).token
  );
  const [Error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const headers = { Authorization: `Bearer${token}` };

  const getAccount = async () => {
    const res = await axios.get(
      "https://localhost:44307/api/Account/GetAccountByID/" + id,
      {
        headers,
      }
    );
    //console.log("resdata" + res.data);
    setAccount(res.data);
  };

  useEffect(() => {
    getAccount();
  }, [id]);

  return (
    <div>
      <h1>Balance Inquiry</h1>
      <p>Account No.:{account.id}</p>
      <p>Balance:{account.balance}</p>
    </div>
  );
};

export default BalanceCheckPage;
