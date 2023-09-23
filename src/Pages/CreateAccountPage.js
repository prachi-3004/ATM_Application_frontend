import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { addacc } from "../Routes";
import "react-toastify/dist/ReactToastify.css";
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
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login")).token
  );

  const handleAccountType = (event) => {
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
      if (!/^\d{16}$/.test(cardNo)) {
        setError("Card No. must be exactly 16 digits");
        toast.error("Card No. must be exactly 16 digits");
        setCardNo("");
      }
      else if (!/^\d{4}$/.test(pinNo)) {
        setError("Pin must be exactly 4 digits");
        toast.error("Pin must be exactly 4 digits");
        setPinNo("");
      }
      else {
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
        const headers = { Authorization: `Bearer${token}` };
        //console.log(headers);
        const response = await axios.post(addacc, res, { headers });

        if (response.status >= 200 && response.status < 300) {
          console.log(response);
          toast.success(`Account created successfully`, {
            onClose: () => {
              navigate("/getcustomer/" + id);
            },
          });
          setAccountType("Savings");
          setCardNo("");
          setDoc("");
          setPinNo("");
          setBalance(100);
          
        } else {
          toast.error("Account creation failed");
        }
      }
    } catch (error) {
      toast.error("Account creation failed" + error.Message);
      setError(error.Message);
    }
  };
  return (
    <div>
      <ToastContainer />
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