import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MiniStatementsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login")).token
  );
  const [Error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const headers = { Authorization: `Bearer${token}` };

  const getTransactions = async () => {
    const res = await axios.get(
      "https://localhost:44307/api/Transaction?id=" + id,
      {
        headers,
      }
    );
    console.log("Transactions " + res.data);
    toast.success("Fetched transaction successfully");
    setTransactions(res.data);
  };

  useEffect(() => {
    getTransactions();
  }, [id]);

  return (
    <div>
      <ToastContainer />
      <h1> Transactions Statement</h1>

      <table className="mini statements table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date of transaction</th>
            <th>Amount</th>
            <th>Type of transaction</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => {
            return (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.time}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.type}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MiniStatementsPage;
