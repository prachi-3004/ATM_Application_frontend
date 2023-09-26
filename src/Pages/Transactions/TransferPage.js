//Transfer page for customer
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getaccbyid, getallcurr, getcurrrate, transaction } from "../../Routes";
const TransferPage = () => {
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login"))
  );
  const { id } = useParams();
  const navigate = useNavigate();
  const headers = { Authorization: `Bearer ${token}` };
  const [recipientId, setRecipientId] = useState(0);

  const [senderAccount, setSenderAccount] = useState([]);
  const [senderBal, setSenderBal] = useState(0); //Sender's balance

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
    await axios
      .get(getaccbyid + id, {
        headers,
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data);
          setSenderAccount(response.data);
        } else {
          toast.error(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
      });
  };

  // const getRecipientAccount = async () => {
  //   if(recipientId!=0){
  //   await axios
  //     .get(getaccbyid + recipientId, {
  //       headers,
  //     })
  //     .then((response) => {
  //       if (response.status >= 200 && response.status < 300) {
  //         console.log(response.data);
  //         setRecipientAccount(response.data);
  //       } else {
  //         toast.error(response.data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error(err.response.data);
  //     });
  //   }
  // };
  // useEffect(() => {
  //   getRecipientAccount();
  // }, [recipientId]);

  useEffect(() => {
    getSenderAccount();
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
    if (amount <= 0 || amount == null || !/^\d+$/.test(amount)) {
      setError("Invalid Amount");
      toast.error("Invalid Amount");
      setPin("");
      setAmount(0);
    } else if (recipientId == null || recipientId == 0) {
      setError("Invalid Recipient Account ");
      toast.error("Invalid Recipient Account ");
      setRecipientId("");
      setPin("");
    } else {
      try {
        if (amount > 0 && recipientId != null) {
          var amt = amount / currRate;
          setSenderBal(senderAccount.balance);

          if (senderAccount.balance > amt) {
            setSenderBal(senderBal - amt);
            //setRecipientBal(recipientAccount.balance + amt);

            const request = {
              type: "Transfer",
              amount: parseInt(amt),
              senderId: id,
              recipientId: recipientId,
              pin: pin,
            };
            console.log(request);

            await axios
              .post(transaction, request, { headers })
              .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                  //console.log(response);
                  toast.success("Transfer successful", {
                    onClose: () => {
                      navigate("/getaccountspec/" + id);
                    },
                  });
                }
              })
              .catch((error) => {
                if (error.response && error.response.status === 500) {
                  toast.error(error.response.data);
                  setPin("");
                } else {
                  toast.error("Transfer failed. Check the details entered");
                }
              });
          } else {
            toast.error("Insufficient balance");
          }
        }
      } catch (error) {
        toast.error("Transfer failed" + error.Message);
        setError(error.Message);
      }
    }
  };
  return (
    <div>
      <ToastContainer />
      <h1>Transfer Money</h1>
      <p>Account Number:{senderAccount.id}</p>
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
          Enter the recipient's account number:{" "}
          <input
            type="number"
            value={recipientId}
            placeholder="Enter recipient account number"
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
          <input
            type="password"
            value={pin}
            placeholder="Enter pin"
            onChange={handlePin}
            required
          />
        </div>
        <br />
        <div>
          <button type="submit"> Transfer </button>
        </div>
      </form>
      <br />
      <buton
        type="submit"
        onClick={() => navigate("/getaccountspec/" + id)}
        style={{ color: "blue", border: "10px" }}
      >
        Go Back
      </buton>
    </div>
  );
};

export default TransferPage;
