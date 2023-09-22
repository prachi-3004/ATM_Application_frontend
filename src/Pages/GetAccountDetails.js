import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AccountTable } from "../Components/AccountTable";
const GetAccountDetails = () => {
  const { user, setUser } = useContext(AppContext);
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login")).token
  );

  const { id } = useParams();
  const navigate = useNavigate();
  var res = {};
  const [account, setAccount] = useState([]);

  const [hadAccs, sethadAccs] = useState(false);
  const headers = { Authorization: `Bearer${token}` };
  const getAcc = async () => {
    res = await axios.get(
      "https://localhost:44307/api/Account/GetAccountByCustomer/" + id,
      {
        headers,
      }
    );
    console.log("Got Account Details:" + res.data);
    if (res.data.length > 0) {
      setAccount(res.data);
      sethadAccs(true);
    }
  };

  useEffect(() => {
    getAcc();
  }, [id]);

  const handleDelete = async (idx) => {
    const headers = { Authorization: `Bearer${token}` };
    //console.log(headers);
    await axios.delete("https://localhost:7104/api/deleteaccount/" + idx, {
      headers,
    });
    console.log("User deleted successfully!");
    alert("User deleted successfully!");
  };
  const handleView = async (idx) => {
    await axios
      .get("https://localhost:44307/api/Account/GetAccountByID/" + idx, {
        headers,
      })
      .then((response) => setAccount(response.data));
    if (account != null) navigate("/getaccountspec/" + idx);
    else {
      alert("Couldn't fetch account details");
      console.log("Couldn't fetch account details");
      navigate("/login");
    }
  };
  return (
    <div>
      {hadAccs && (
        <AccountTable
          rows={account}
          deleteRow={handleDelete}
          viewRow={handleView}
        />
      )}

      {!hadAccs && (
        <div>
          You don't have any accounts
          <button onClick={() => navigate("/createaccount/" + id)}>
            Click here to create account
          </button>
        </div>
      )}
    </div>
  );
};
export default GetAccountDetails;
