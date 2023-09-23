import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AccountTable } from "../Components/AccountTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getallacc, getaccbyid } from "../Routes";
const GetAllAccounts = () => {
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login")).token
  );

  const navigate = useNavigate();
  var res = {};
  const [account, setAccount] = useState([]);
  const headers = { Authorization: `Bearer${token}` };
  const getAccs = async () => {
    res = await axios.get(getallacc, {
      headers,
    });
    //console.log("Got Account Details:" + res.data);
    if (res.data.length > 0) {
      setAccount(res.data);
    }
  };

  useEffect(() => {
    getAccs();
  }, []);

  const handleDelete = async (idx) => {
    //console.log(headers);
    await axios.delete("" + idx, {
      headers,
    });
    console.log("Account deleted successfully!");
    toast.success("Account deleted successfully!");
  };
  const handleView = async (idx) => {
    await axios
      .get(getaccbyid + idx, {
        headers,
      })
      .then((response) => setAccount(response.data));
    if (account != null) navigate("/getaccountspec/" + idx);
    else {
      toast.error("Couldn't fetch account details");
      console.log("Couldn't fetch account details");
      navigate("/navigateadmin");
    }
  };
  return (
    <div>
      <ToastContainer />
      <AccountTable
        rows={account}
        deleteRow={handleDelete}
        viewRow={handleView}
      />
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
export default GetAllAccounts;
