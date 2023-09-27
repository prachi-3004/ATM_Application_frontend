//Getting account page for table
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AccountTable } from "../Components/AccountTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getaccbycustid, deleteaccount } from "../Routes";
const Getaccbyid = () => {
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
        if (
          response.status >= 200 &&
          response.status < 300 &&
          response.data.length > 0
        ) {
          //console.log(response.data);
          setAccount(response.data);
          sethadAccs(true);
        } else {
          toast.error(response.data);
        }
      })
      .catch((err) => {
        console.log(err.Message);
        toast.error(err.Message);
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
          toast.success("Account disabled successfully!");
          // onClose: () => {
          //   navigate("/getallaccounts");
          // },
          //});
        } else {
          toast.error(response.data);
        }
      })
      .catch((err) => {
        toast.error(err.response.data);
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

      {!hadAccs && <div>You don't have any accounts</div>}
      <br />
      <button type="submit" onClick={() => navigate("/navigatecustomer")}>
        Go Back
      </button>
    </div>
  );
};
export default Getaccbyid;
