import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getaccbyid, getallcurr, getcurrrate, transaction } from "../../Routes";
const TransferPage = () => {
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login")).token
  );

  const { id } = useParams();
  const navigate = useNavigate();

  var res = {};

  const headers = { Authorization: `Bearer${token}` };

  const [recipientId, setRecipientId] = useState(null);

  const [recipientAccount, setRecipientAccount] = useState([]);
  const [senderAccount, setSenderAccount] = useState([]);
  const [senderBal, setSenderBal] = useState(0); //Sender's balance
  const [recipientBal, setRecipientBal] = useState(0); //Recipient's balance
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
  const handleRecipientId = (event) => {
    setRecipientId(event.target.value);
  };

  const getSenderAccount = async () => {
    const res = await axios.get(getaccbyid + id, {
      headers,
    });
    console.log(res.data);
    setSenderAccount(res.data);
  };

  const getRecipientAccount = async (recipientId) => {
    if (recipientId != null) {
      const res1 = await axios.get(getaccbyid + recipientId, {
        headers,
      });
      console.log(res1.data);
      setRecipientAccount(res1.data);
    }
  };

  useEffect(() => {
    getSenderAccount();
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
      getRecipientAccount(recipientId);
      var amt = amount / currRate;
      setSenderBal(senderAccount.balance);

      if (senderAccount.balance - 100 > amt) {
        setSenderBal(senderBal - amt);
        setRecipientBal(recipientAccount.balance + amt);

        const request = {
          type: "Transfer",
          amount: parseInt(amt),
          senderId: id,
          recipientId: recipientId,
          pin: pin,
        };
        console.log(request);

        axios.post(transaction, request).then((response) => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response);
            toast.success("Transfer successful");

            navigate("/getaccountspec/" + id);
          }
          if (response.data === 0) {
            toast.error("Transfer failed");
          }
        });
      } else {
        toast.error("Insufficient balance");
      }
    } catch (error) {
      toast.error("Transfer failed" + error.Message);
      setError(error.Message);
    }
  };
  return (
    <div>
      <ToastContainer />
      <h1>Transfer Money</h1>
      <p>Account No.:{senderAccount.id}</p>
      <p>Balance:{senderAccount.balance}</p>
      <form onSubmit={handleSubmit}>
        <label>Select currency in which you want to transfer money:</label>
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
          Enter the recipient's account no.:{" "}
          <input
            type="text"
            value={recipientId}
            onChange={handleRecipientId}
            required
          />
        </div>
        <div>
          Enter the amount to be transferred:{" "}
          <input
            type="number"
            max={senderAccount.balance}
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
          <button type="submit"> Transfer </button>
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

export default TransferPage;
