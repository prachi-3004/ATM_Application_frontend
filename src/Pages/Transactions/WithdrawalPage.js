//withdrawal page for customer
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { getaccbyid, transaction, getallcurr, getcurrrate } from "../../Routes";
import "react-toastify/dist/ReactToastify.css";
const WithdrawalPage = () => {
  const [account, setAccount] = useState([]);
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login"))
  );
  const { id } = useParams();
  const navigate = useNavigate();
  const headers = { Authorization: `Bearer ${token}` };
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
    await axios
      .get(getaccbyid + id, {
        headers,
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data);
          setAccount(response.data);
        } else {
          toast.error(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
      });
  };

  useEffect(() => {
    getAccount();
  }, [id]);

  const getCurr = async () => {
    await axios
      .get(getallcurr, {
        headers,
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setCurr(response.data);
        } else {
          toast.error("Unable to fetch currency");
        }
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };
  useEffect(() => {
    getCurr();
  }, []);
  const getCurrRate = async (selcurr) => {
    if (selcurr != null) {
      await axios
        .get(getcurrrate + selcurr, {
          headers,
        })
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            console.log("Currency Rate got" + response.data);
            setCurrRate(response.data);
          } else {
            toast.error("Unable to fetch currency rate");
          }
        })
        .catch((error) => toast.error(error.response.data));
    } else {
      toast.error("Currency should be selected");
    }
  };

  useEffect(() => {
    getCurrRate(selcurr);
  }, [selcurr]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (amount < 0 || amount == null || !/^\d+$/.test(amount)) {
      setError("Invalid Amount");
      toast.error("Invalid Amount");
      setPin("");
      setAmount(0);
    } else {
      try {
        if (amount > 0 && amount != NaN) {
          var amt = amount / currRate;
          setBalance(account.balance);
          if (account.balance >= amt) {
            setBalance(account.balance - amt);

            const request = {
              type: "Withdrawal",
              amount: parseInt(amt),
              senderId: id,
              recipientId: null,
              pin: pin,
            };
            console.log(request);
            await axios
              .post(transaction, request, { headers })
              .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                  //console.log(response);
                  toast.success("Withdraw successful", {
                    onClose: () => {
                      navigate("/getaccountspec/" + id);
                    },
                  });
                } else {
                  toast.error(response);
                }
              })
              .catch((error) => {
                console.log(error);
                if (error.response && error.response.status === 500) {
                  toast.error(error.response.data + " Please check your pin");
                  setPin("");
                } else {
                  toast.error("Withdrawal failed. Check the details entered");
                }
              });
          } else {
            toast.error("Insufficient balance");
          }
        }
      } catch (error) {
        toast.error("Withdrawal failed" + error.Message);
        setError(error.Message);
      }
    }
  };
  return (
    <div>
      <ToastContainer />
      <h1>Withdrawal Page</h1>
      <div className="textdiv">
        <div>Account Number: {account.id}</div>
        <div>Balance(in INR): {account.balance}</div>
      </div>
      <div className="formdiv">
        <form onSubmit={handleSubmit}>
          <div className="forminsidediv">
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
          </div>
          <div className="forminsidediv">
            <label>Enter the amount to withdraw: </label>
            <input
              type="number"
              value={amount}
              onChange={handleAmount}
              required
            />
          </div>
          <div className="forminsidediv">
            <label>Enter PIN </label>
            <input
              type="password"
              value={pin}
              placeholder="Enter ATM Pin"
              onChange={handlePin}
              required
            />
          </div>
          <br />
          <div>
            <button type="submit"> Withdraw </button>
          </div>
        </form>
      </div>
      <br />t
      <button type="submit" onClick={() => navigate("/getaccountspec/" + id)}>
        Go Back
      </button>
    </div>
  );
};

export default WithdrawalPage;
