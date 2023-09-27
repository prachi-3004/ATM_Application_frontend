//get account dtails for table
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AccountTable } from "../Components/AccountTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getaccbycustid, getaccbyid, deleteaccount } from "../Routes";
import { AppContext } from "../Context/AppContext";
const GetAccountDetails = () => {
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login"))
  );

  const { id } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState([]);
  const [hadAccs, sethadAccs] = useState(false);
  const headers = { Authorization: `Bearer ${token}` };
  const getAcc = async () => {
    await axios
      .get(getaccbycustid + id, {
        headers,
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data);
          setAccount(response.data);
          sethadAccs(true);
        } else {
          toast.error(response.data);
          sethadAccs(false);
        }
      })
      .catch((err) => {
        console.log(err);
        sethadAccs(false);
        toast.error(err.response.data);
      });
  };

  useEffect(() => {
    getAcc();
  }, [id]);

  const handleDelete = async (idx) => {
    await axios
      .put(
        deleteaccount,
        { id: idx },
        {
          headers,
        }
      )
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log("Account deleted successfully!");
          window.location.reload();
          toast.success("Account disabled successfully!", {
            onClose: () => {
              navigate("/getcustomer/" + id);
            },
          });
        } else {
          toast.error(response.data);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 500) {
          toast.error(err.response.data);
        } else {
          toast.error(err.Message);
        }
      });
  };
  const handleView = async (idx) => {
    navigate("/getaccountspec/" + idx);
  };
  return (
    <div>
      <ToastContainer />
      {account.length > 0 && (
        <AccountTable
          rows={account}
          deleteRow={handleDelete}
          viewRow={handleView}
        />
      )}

      {account.length == 0 && (
        <div>
          No accounts created yet
          <button onClick={() => navigate("/createaccount/" + id)}>
            Click here to create account
          </button>
        </div>
      )}

      <br />
      <button type="submit" onClick={() => navigate("/getcustomer/" + id)}>
        Go Back
      </button>
    </div>
  );
};
export default GetAccountDetails;
