import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    if (id != null) {
      const res = await axios.get(
        "https://localhost:44307/api/Account/GetAccountByID/" + id,
        {
          headers,
        }
      );
      //console.log("resdata" + res.data);
      setAccount(res.data);
      toast.success("Balance fetched successfully");
    }
  };

  useEffect(() => {
    getAccount();
  }, [id]);

  return (
    <div>
      <ToastContainer />

      <h1>Balance Inquiry</h1>
      <p>Account No.:{account.id}</p>
      <p>Balance:{account.balance}</p>
    </div>
  );
};

export default BalanceCheckPage;
