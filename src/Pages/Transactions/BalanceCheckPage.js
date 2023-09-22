import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { AppContext } from "../../Context/AppContext";

const BalanceCheckPage = () => {
  const { user, setUser } = useContext(AppContext);
  const [account, setAccount] = useState([]);
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login")).token
  );
  const [Error, setError] = useState("");

  const { id } = useParams();
  //let id=3002;
  const navigate = useNavigate();
  var res = {};

  useEffect(() => {
    setToken(user.token);
  }, [user.token]);
  if (user.token == null) navigate("/");
  const headers = { Authorization: `Bearer${user.token}` };

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
      navigate("/getspecaccount/" + id);
    } catch (error) {
      setError(error.Message);
    }
  };
  return (
    <div>
      <h1>Balance Inquiry</h1>
      <p>Account No.:{account.id}</p>
      <p>Balance:{account.balance}</p>
      <br />
      <div>
        <button type="submit" onClick={handleSubmit}>
          {" "}
          Go back{" "}
        </button>
      </div>
    </div>
  );
};

export default BalanceCheckPage;
