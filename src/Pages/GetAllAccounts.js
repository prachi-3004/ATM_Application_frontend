//get all accounts for admin
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AccountTable } from "../Components/AccountTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getallacc, deleteaccount } from "../Routes";
const GetAllAccounts = () => {
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login"))
  );

  const navigate = useNavigate();
  const [account, setAccount] = useState([]);
  const headers = { Authorization: `Bearer ${token}` };
  const getAccs = async () => {
    await axios
      .get(getallacc, {
        headers,
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data);
          setAccount(response.data);
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
    getAccs();
  }, []);

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
      <AccountTable
        rows={account}
        deleteRow={handleDelete}
        viewRow={handleView}
      />
      <buton
        type="submit"
        onClick={() => navigate("/navigateadmin")}
        style={{ color: "blue", border: "10px" }}
      >
        Go Back
      </buton>
    </div>
  );
};
export default GetAllAccounts;
