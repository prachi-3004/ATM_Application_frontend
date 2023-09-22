import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
const CreateAccountPage = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("Savings");
  const [cardNo, setCardNo] = useState("");
  const { id } = useParams();
  const [pinNo, setPinNo] = useState("");
  const [balance, setBalance] = useState(100);
  const [doc, setDoc] = useState(new Date().toISOString() + "");
  const [Error, setError] = useState("");
  const { user, setUser } = useContext(AppContext);
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(user.token);
  }, [user.token]);
  if (!user.token) navigate("/");
  const handleAccountType = (event) => {
    //console.log(event.target.value);
    setAccountType(event.target.value);
  };

  const handleCardNo = (event) => {
    setCardNo(event.target.value);
  };

  const handlePinNo = (event) => {
    setPinNo(event.target.value);
  };

  const handleBalance = (event) => {
    setBalance(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (cardNo.trim() == "") {
        alert("Card No. cannot be empty");
        return;
      }
      if (pinNo.trim() == "") {
        alert("Pin No. cannot be empty");
        return;
      } else {
        const res = {
          customerId: parseInt(id),
          type: accountType,
          cardNumber: cardNo,
          dateOfCreation: doc,
          pin: pinNo,
          balance: balance,
        };
        console.log(res);
        setToken(user.token);
        const headers = { Authorization: `Bearer${user.token}` };
        console.log(headers);
        const response = await axios.post(
          "https://localhost:44307/api/Account/AddAccount",
          res,
          { headers }
        );

        if (response.status >= 200 && response.status < 300) {
          console.log(response);
          alert(`Account created successfully`);
          setAccountType("Savings");
          setCardNo("");
          setDoc("");
          setPinNo("");
          setBalance(100);
          navigate("/getcustomer/" + id);
        } else {
          alert("Account creation failed");
        }
      }
    } catch (error) {
      setError(error.Message);
    }
  };
  return (
    <div>
      <h1>Create your Account!</h1>
      <h3>Enter your details:</h3>
      <form onSubmit={handleSubmit}>
        <div>
          {" "}
          Select the account type:
          <select onChange={handleAccountType}>
            <option value="Savings">Savings</option>
            <option value="Salary">Salary</option>
            <option value="Current">Current</option>
            <option value="FD">Fixed Deposit</option>
          </select>
        </div>
        <div>
          Card No: <input type="text" value={cardNo} onChange={handleCardNo} />
        </div>
        <div>
          Pin No: <input type="text" value={pinNo} onChange={handlePinNo} />
        </div>
        <div>
          Balance:{" "}
          <input
            type="number"
            min="100"
            value={balance}
            onChange={handleBalance}
          />
        </div>
        <div>
          <button type="submit"> Submit </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccountPage;
