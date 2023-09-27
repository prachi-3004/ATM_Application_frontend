//Transaction history page for customer
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { gettransactionhistory } from "../../Routes";
const MiniStatementsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login"))
  );

  const { id } = useParams();
  const navigate = useNavigate();
  const headers = { Authorization: `Bearer ${token}` };

  const getTransactions = async () => {
    await axios
      .get(gettransactionhistory + id, {
        headers,
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log("Transactions " + response.data);
          setTransactions(response.data);
        } else {
          toast.error(response.data);
        }
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
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
            <th>Amount (in INR)</th>

            <th>Type of transaction</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => {
            return (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.createdAt}</td>
                <td>{transaction.amount}</td>

                {transaction.type === 0 && <td>Withdrawal</td>}
                {transaction.type === 1 && <td>Deposit</td>}
                {transaction.type === 2 && <td>Transfer_Credit</td>}
                {transaction.type === 3 && <td>Transfer_Debit</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <button type="submit" onClick={() => navigate("/getaccountspec/" + id)}>
        Go Back
      </button>
    </div>
  );
};

export default MiniStatementsPage;
