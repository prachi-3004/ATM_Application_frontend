import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const GetCustomer = () => {
  const { user, setUser } = useContext(AppContext);
  const [token, setToken] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  var res = {};
  const [account, setAccount] = useState([]);
  useEffect(() => {
    setToken(user.token);
  }, [user.token]);
  if (!user.token) navigate("/");
  const [customer, setCustomer] = useState({});
  const headers = { Authorization: `Bearer${user.token}` };
  const [hadAcc, sethadAcc] = useState(false);
  const getcust = async () => {
    res = await axios.get("https://localhost:44307/api/Customer/" + id, {
      headers,
    });
    console.log(res.data);
    setCustomer(res.data);
  };
  console.log(customer);
  useEffect(() => {
    getcust();
  }, [id]);
  const handleaddAccount = async () => {
    sethadAcc(true);
    navigate("/createaccount");
  };
  const handleGetAccount = async () => {
    await axios
      .get("", { headers })
      .then((response) => setAccount(response.data));
    navigate("/getaccountdetails");
  };
  const handleDelete = async () => {
    if (hadAcc) {
      await axios
        .delete("https://localhost:44307/api/Customer/" + id, {
          headers,
        })
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
      alert("account deleted");
      sethadAcc(false);
    } else {
      alert("couldnot delete account");
    }
  };
  return (
    <div>
      {!hadAcc && <button onClick={handleaddAccount}>Add Account</button>}
      {hadAcc && (
        <button onClick={handleGetAccount}>Get Account Details</button>
      )}
      {hadAcc && <button onClick={handleDelete}>Delete account</button>}
      {customer && <h1>Customer Details</h1>}

      {customer?.id && <div> Customer ID: {customer?.id} </div>}
      {customer?.name && <div> Customer Name: {customer?.name}</div>}
      {customer?.userName && (
        <div> Customer User Name: {customer?.userName} </div>
      )}
      {customer?.address && <div> Customer Address: {customer?.address} </div>}
      {customer?.city && <div> Customer City: {customer?.city} </div>}
      {customer?.email && <div> Email ID: {customer?.email} </div>}
      {customer?.contact && <div> Contact Number: {customer?.contact} </div>}
    </div>
  );
};
export default GetCustomer;
