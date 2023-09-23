import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getaccbyid } from "../../Routes";
const BalanceCheckPage = () => {
  const [account, setAccount] = useState([]);
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login")).token
  );
  const [Error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const headers = { Authorization: `Bearer${token}` };

  const getAccount = async () => {
    if (id != null) {
      const res = await axios.get(getaccbyid + id, {
        headers,
      });
      //console.log("resdata" + res.data);
      if (res.data) {
        setAccount(res.data);
        //toast.success("Balance fetched successfully");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    getAccount();
  }, [id]);

  return (
    <div>
      <ToastContainer />

      <h1>Balance Inquiry</h1>
      <p>Account No.:{account.id}</p>
      <p>Balance:{account.balance}</p>
      <br />
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

<<<<<<< HEAD
export default BalanceCheckPage;
=======
export default BalanceCheckPage;
>>>>>>> 13c59482da025524d7800d82287279af2000d732
