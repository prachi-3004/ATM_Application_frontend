import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from "axios";

const GetspecAccount = () => {
  const [account, setAccount] = useState({});
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const { user, setUser } = useContext(AppContext);
  const headers = { Authorization: `Bearer${user.token}` };
  useEffect(() => {
    setToken(user.token);
  }, [user.token]);
  if (!user.token) navigate("/");
  const getAcc = async () => {
    const res = await axios.get(
      "https://localhost:44307/api/Account/GetAccountByID/" + id,
      {
        headers,
      }
    );
    console.log(res.data);
    setAccount(res.data);
  };

  useEffect(() => {
    getAcc();
  }, [id]);
  return (
    <div>
      <h3>Account Details</h3>
      <div>
        {account && <div> Account ID: {account?.id} </div>}
        {account && <div> Account Type: {account?.type} </div>}
        {account && <div> Date of Creation: {account?.dateOfCreation} </div>}
        {account && <div> Card Number: {account?.cardNumber} </div>}
        {account && <div> Balance: {account?.balance} </div>}
      </div>
      <div>{!account && <div>Unable to fetch account details</div>}</div>
    </div>
  );
};
export default GetspecAccount;
