//Create account page
import React, { useState } from "react";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { addacc } from "../Routes";
import "react-toastify/dist/ReactToastify.css";
const CreateAccountPage = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("Savings");
  const { id } = useParams();
  const [pinNo, setPinNo] = useState("");
  const [balance, setBalance] = useState(100);
  const [doc, setDoc] = useState(new Date().toISOString() + "");
  const [Error, setError] = useState("");

  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login"))
  );
  const headers = { Authorization: `Bearer ${token}` };
  const handleAccountType = (event) => {
    setAccountType(event.target.value);
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
      if (!/^\d{4}$/.test(pinNo)) {
        setError("Pin must be exactly 4 digits");
        toast.error("Pin must be exactly 4 digits");
        setPinNo("");
      } else {
        const res = {
          customerId: parseInt(id),
          type: accountType,
          // createdAt: doc,
          pin: pinNo,
          balance: parseInt(balance),
        };
        console.log(res);

        await axios
          .post(addacc, res, { headers })
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              console.log(response);
              toast.success(`Account created successfully`, {
                onClose: () => {
                  navigate("/getcustomer/" + id);
                },
              });
              setAccountType("Savings");

              setDoc("");
              setPinNo("");
              setBalance(100);
            } else {
              toast.error("Account creation failed");
            }
          })
          .catch((error) => {
            if (error.response && error.response.status === 500) {
              toast.error(error.reponse.data);
            } else {
              toast.error("Account creation failed" + error.Message);
            }
            setError(error.Message);
          });
      }
    } catch (error) {
      toast.error(error.Message);
    }
  };
  return (
    <div>
      <ToastContainer />
      <h1>Create your Account!</h1>
      <h3>Enter your details:</h3>
      <div className="formdiv">
        <form onSubmit={handleSubmit}>
          <div className="forminsidediv">
            {" "}
            <label>Select the account type:</label>
            <select onChange={handleAccountType}>
              <option value="Savings">Savings</option>
              <option value="Salaried">Salary</option>
              <option value="Current">Current</option>
            </select>
          </div>

          <div className="forminsidediv">
            <label> Pin No: </label>
            <input
              type="password"
              value={pinNo}
              onChange={handlePinNo}
              required
            />
          </div>
          <div className="forminsidediv">
            <label>Balance: </label>
            <input
              type="number"
              value={balance}
              onChange={handleBalance}
              required
            />
          </div>
          <div>
            <button type="submit"> Submit </button>
          </div>
        </form>
      </div>
      <buton
        type="submit"
        onClick={() => navigate("/getcustomer/" + id)}
        style={{ color: "blue", border: "10px" }}
      >
        Go Back
      </buton>
    </div>
  );
};

export default CreateAccountPage;
