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
  const { user, setUser } = useContext(AppContext);
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
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
      });
  };

  useEffect(() => {
    getAcc();
  }, [id]);

  const handleDelete = async (idx) => {
    await axios
      .put(deleteaccount + idx, {
        headers,
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log("Account deleted successfully!");
          toast.success("Account disabled successfully!");
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
      {hadAccs && (
        <AccountTable
          rows={account}
          deleteRow={handleDelete}
          viewRow={handleView}
        />
      )}

      {!hadAccs && (
        <div>
          You don't have any accounts{" "}
          <button onClick={() => navigate("/createaccount/" + id)}>
            Click here to create account
          </button>
        </div>
      )}
      <br />
      <buton
        type="submit"
        onClick={() => navigate("/getcustomer/" + id)}
        style={{ color: "blue", border: "10px" }}
      >
        Go Back
      </buton>
    </div>
  );
};
export default GetAccountDetails;
