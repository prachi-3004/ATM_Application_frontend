//Balance check page for customer
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getaccbyid } from "../../Routes";
const BalanceCheckPage = () => {
  const [account, setAccount] = useState([]);
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login"))
  );

  const { id } = useParams();
  const navigate = useNavigate();

  const headers = { Authorization: `Bearer ${token}` };

  const getAccount = async () => {
    if (id != null) {
      await axios
        .get(getaccbyid + id, {
          headers,
        })
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            setAccount(response.data);
          } else {
            toast.error("Something went wrong");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 500) {
            toast.error(error.response.data);
          } else {
            toast.error("Something went wrong");
          }
        });
    } else {
      toast.error("Invalid account id");
    }
  };

  useEffect(() => {
    getAccount();
  }, [id]);

  return (
    <div>
      <ToastContainer />

      <h1>Balance Inquiry</h1>
      <div className="textdiv">
        <div>Account Number:{account.id}</div>
        <div>Balance (in INR):{account.balance}</div>
        <br />
      </div>
      <button type="submit" onClick={() => navigate("/getaccountspec/" + id)}>
        Go Back
      </button>
    </div>
  );
};

export default BalanceCheckPage;
