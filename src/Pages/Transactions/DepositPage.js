import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

const DepositPage = () => {
  const [account, setAccount] = useState([]);
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login")).token
  );
  const { id } = useParams();
  const navigate = useNavigate();
  var res = {};
  const headers = { Authorization: `Bearer${token}` };
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [Error, setError] = useState("");
  const [Curr, setCurr] = useState([]);
  const [selcurr, setSelcurr] = useState("");
  const [currRate, setCurrRate] = useState();
  const [pin, setPin] = useState("");

  const handleAmount = (event) => {
    console.log(account);
    setAmount(event.target.value);
  };
  const handlePin = (event) => {
    //console.log(account);
    setPin(event.target.value);
  };
  const getAccount = async () => {
    res = await axios.get(
      "https://localhost:44307/api/Account/GetAccountByID/" + id,
      {
        headers,
      }
    );

    setAccount(res.data);
  };

  useEffect(() => {
    getAccount();
  }, [id]);

  const getCurr = async () => {
    var res1 = await axios.get("https://localhost:44307/api/Currency/GetAll", {
      headers,
    });
    console.log("Available Currencies" + res1.data);
    setCurr(res1.data);
  };

  useEffect(() => {
    getCurr();
  }, []);

  const handleCurrencySelect = async (e) => {
    console.log(e.target.value);
    setSelcurr(e.target.value);
  };

  const getCurrRate = async (selcurr) => {
    //console.log(selcurr);
    if (selcurr != null) {
      var res2 = await axios.get(
        "https://localhost:44307/api/Currency/GetRate/" + selcurr,
        {
          headers,
        }
      );

      console.log("Currency Rate" + res2.data);
      setCurrRate(res2.data);
    }
  };

  useEffect(() => {
    getCurrRate();
  }, [selcurr]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setBalance(account.balance);
      console.log(account.balance);
      console.log(amount);
      console.log(currRate);
      console.log(amount / currRate);
      console.log(balance + amount / currRate);
      setBalance(balance + amount / currRate);

      const request = {
        type: "Deposit",
        amount: amount,
        RecipientId: id,
        pin: pin,
      };
      console.log(request);
      axios
        .post("https://localhost:44307/api/Transaction", request, { headers })
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            //console.log(response);
            alert("Deposit successful");
          }
          if (response.status == 500) {
            alert("Deposit failed. Check the details entered");
            setPin("");
            setAmount(0);
            setSelcurr("");
          }
        });
    } catch (error) {
      alert("Deposit failed. Check the details entered");
      setPin("");
      setAmount(0);
      setSelcurr("");
      setError(error.Message);
    }
  };
  return (
    <div>
      <h1>Deposit</h1>
      <p>Account No: {account.id}</p>
      <p>Balance: {account.balance}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Select currency in which you want to deposit money:</label>
          <select name="Currencies" onChange={(e) => handleCurrencySelect(e)}>
            {Curr.map((cur, index) => (
              <option key={index} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>
        <div>
          Enter the amount to deposit:{" "}
          <input
            type="number"
            value={amount}
            onChange={handleAmount}
            required
          />
        </div>
        <div>
          Enter PIN{" "}
          <input type="password" value={pin} onChange={handlePin} required />
        </div>
        <br />
        <div>
          <button type="submit"> Deposit </button>
        </div>
      </form>
    </div>
  );
};

export default DepositPage;
