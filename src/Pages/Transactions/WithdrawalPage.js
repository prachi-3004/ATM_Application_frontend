import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { getaccbyid, transaction, getallcurr, getcurrrate } from "../../Routes";
import "react-toastify/dist/ReactToastify.css";
const WithdrawalPage = () => {
  const [account, setAccount] = useState([]);
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login")).token
  );
  const { id } = useParams();
  const navigate = useNavigate();
  const headers = { Authorization: `Bearer${token}` };
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [Error, setError] = useState("");
  const [Curr, setCurr] = useState([]);
  const [selcurr, setSelcurr] = useState("INR");
  const [currRate, setCurrRate] = useState(0);
  const [pin, setPin] = useState("");

  const handleAmount = (event) => {
    setAmount(event.target.value);
  };
  const handlePin = (event) => {
    setPin(event.target.value);
  };
  const getAccount = async () => {
    const res = await axios.get(getaccbyid + id, {
      headers,
    });
    setAccount(res.data);
  };

  useEffect(() => {
    getAccount();
  }, [id]);

  const getCurr = async () => {
    const res1 = await axios.get(getallcurr, {
      headers,
    });
    setCurr(res1.data);
  };
  useEffect(() => {
    getCurr();
  }, []);
  const getCurrRate = async (selcurr) => {
    if (selcurr != null) {
      const res2 = await axios.get(getcurrrate + selcurr, {
        headers,
      });
      //console.log(res2);
      console.log("Currency Rate got" + res2.data);
      setCurrRate(res2.data);
    }
  };

  useEffect(() => {
    getCurrRate(selcurr);
  }, [selcurr]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      var amt = amount / currRate;
      setBalance(account.balance);
      if (account.balance - 100 > amt) {
        setBalance(account.balance - amt);
        //console.log(account.balance - amt);

        const request = {
          type: "Withdrawal",
          amount: parseInt(amt),
          senderId: id,
          pin: pin,
        };
        console.log(request);
<<<<<<< HEAD
        axios.post(transaction, request).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            //console.log(response);
            toast.success("Withdraw successful");
            navigate("/getaccountspec/" + id);
          }
          if (response.data === 0) {
            toast.error("Withdrawal failed");
          }
        });
=======
        axios
          .post(transaction, request)
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              //console.log(response);
              toast.success("Withdraw successful");
              navigate("/getaccountspec/" + id);
            }
          })
          .catch((error) => {
            if (error.response && error.response.status === 500) {
              toast.error(error.response.data);
              setPin("");
            } else {
              toast.error("Withdrawal failed. Check the details entered");
            }
          });
>>>>>>> 13c59482da025524d7800d82287279af2000d732
      } else {
        toast.error("Insufficient balance");
      }
    } catch (error) {
      toast.error("Withdrawal failed" + error.Message);
      setError(error.Message);
    }
  };
  return (
    <div>
      <ToastContainer />
      <h1>Withdrawal</h1>
      <p>Account No.: {account.id}</p>
      <p>Balance: {account.balance}</p>

      <form onSubmit={handleSubmit}>
        <label>Select currency in which you want to withdraw money:</label>
        <select
          name="Currency"
          defaultValue="INR"
          onChange={(e) => setSelcurr(e.target.value)}
        >
          {Curr.map((cur, index) => (
            <option key={index} value={cur}>
              {cur}
            </option>
          ))}
        </select>
        <div>
          Enter the amount to withdraw:{" "}
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
          <button type="submit"> Withdraw </button>
        </div>
      </form>
      <br />
      <buton
        type="submit"
        onClick={() => navigate(-1)}
        style={{ color: "blue", border: "10px" }}
      >
        Go Back
      </buton>
    </div>
  );
};

<<<<<<< HEAD
export default WithdrawalPage;
=======
export default WithdrawalPage;
>>>>>>> 13c59482da025524d7800d82287279af2000d732
