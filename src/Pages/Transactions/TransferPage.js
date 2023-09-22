import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { AppContext } from "../../Context/AppContext";
const TransferPage = () => {
  const { user, setUser } = useContext(AppContext);
  const [token, setToken] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();
  var res = {};

  useEffect(() => {
    setToken(user.token);
  }, [user.token]);
  if (user.token == null) navigate("/");
  const headers = { Authorization: `Bearer${user.token}` };

  const [recipientId, setRecipientId] = useState("");
  const [recipientAccount, setRecipientAccount] = useState([]);
  const [senderAccount, setSenderAccount] = useState([]);
  const [senderBal, setSenderBal] = useState(0); //Sender's balance
  const [recipientBal, setRecipientBal] = useState(0); //Recipient's balance
  const [amount, setAmount] = useState(0);
  const [Error, setError] = useState("");

  //console.log(id);

  const handleAmount = (event) => {
    setAmount(event.target.value);
  };

  //let recid=3002;

  const handleRecipientId = (event) => {
    setRecipientId(event.target.value);
  };

  const getSenderAccount = async () => {
    res = await axios.get(
      "https://localhost:44307/api/Account/GetAccountByID/" + id,
      {
        headers,
      }
    );
    console.log(res.data);
    setSenderAccount(res.data);
  };

  const getRecipientAccount = async (recipientId) => {
    var res1 = await axios.get(
      "https://localhost:44307/api/Account/GetAccountByID/" + recipientId,
      {
        headers,
      }
    );
    console.log(res1.data);
    setRecipientAccount(res1.data);
  };

  useEffect(() => {
    getSenderAccount();
  }, [id]);

  // useEffect(() => {
  //     getRecipientAccount();
  //   }, [recipientId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      getRecipientAccount(recipientId);
      setSenderBal(senderAccount.balance);
      setSenderBal(senderBal - amount);

      setRecipientBal(recipientAccount.balance + amount);

      const request = {
        type: "Transfer",
        amount: amount,
        senderId: id,
        recipientId: recipientId,
      };
      console.log(request);
      //console.log(recipient);
      axios
        .post("https://localhost:44307/api/Transaction", request)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response);
            alert("Transfer successful");
          } else {
            alert("Transfer failed");
          }
        });
    } catch (error) {
      setError(error.Message);
    }
  };
  return (
    <div>
      <h1>Transfer Money</h1>
      <p>Account No.:{senderAccount.id}</p>
      <p>Balance:{senderAccount.balance}</p>
      <form onSubmit={handleSubmit}>
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
            min="100"
            max={senderAccount.balance}
            value={amount}
            onChange={handleAmount}
            required
          />
        </div>

        <br />
        <div>
          <button type="submit"> Transfer </button>
        </div>
      </form>
    </div>
  );
};

export default TransferPage;
