import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { AppContext } from "../../Context/AppContext";

const WithdrawalPage = () => {
  const { user, setUser } = useContext(AppContext);
  const [account, setAccount] = useState([]);
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login")).token
  );
  const { id } = useParams();
  //let id=3002;
  const navigate = useNavigate();
  var res = {};

  useEffect(() => {
    setToken(user.token);
  }, [user.token]);
  if (user.token == null) navigate("/");
  const headers = { Authorization: `Bearer${user.token}` };

  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [Error, setError] = useState("");

  //console.log(id);

  const handleAmount = (event) => {
    console.log(account);
    setAmount(event.target.value);
  };

  const getAccount = async () => {
    res = await axios.get(
      "https://localhost:44307/api/Account/GetAccountByID/" + id,
      {
        headers,
      }
    );
    console.log("resdata" + res.data);
    setAccount(res.data);
  };

  useEffect(() => {
    getAccount();
  }, [id]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setBalance(account.balance);
      setBalance(balance - amount);
      //const res = {...account, balance};
      const request = {
        type: "Withdrawal",
        amount: amount,
        senderId: id,
      };
      console.log(request);
      axios
        .post("https://localhost:44307/api/Transaction", request)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response);
            alert("Withdraw successful");
          } else {
            alert("Withdrawal failed");
          }
        });
    } catch (error) {
      setError(error.Message);
    }
  };
  return (
    <div>
      <h1>Withdrawal</h1>
      <p>Account No.: {account.id}</p>
      <p>Balance: {account.balance}</p>

      <form onSubmit={handleSubmit}>
        <div>
          Enter the amount to withdraw:{" "}
          <input
            type="number"
            min="100"
            value={amount}
            onChange={handleAmount}
            required
          />
        </div>
        <br />
        <div>
          <button type="submit"> Withdraw </button>
        </div>
      </form>
    </div>
  );
};

export default WithdrawalPage;
