//getting specific account details with transactions page
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getaccbyid, getcustbyemail } from "../Routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../Context/AppContext";
const GetspecAccount = () => {
  const [account, setAccount] = useState({});
  const { id } = useParams();
  const navigate = useNavigate("");
  const { user, setUser } = useContext(AppContext);
  const [customer, setCustomer] = useState({});
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login"))
  );
  const [role, setRole] = useState(
    JSON.parse(window.localStorage.getItem("role"))
  );
  const headers = { Authorization: `Bearer ${token}` };
  const getcust = async () => {
    await axios
      .get(getcustbyemail + user, {
        headers,
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data);
          setCustomer(response.data);
        } else {
          toast.error(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.Message);
      });
  };

  useEffect(() => {
    getcust();
  }, []);
  const getAcc = async () => {
    await axios
      .get(getaccbyid + id, {
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
    getAcc();
  }, [id]);

  const handleWithdrawal = () => {
    navigate("/transactions/withdrawal/" + id);
  };
  const handleDeposit = () => {
    navigate("/transactions/deposit/" + id);
  };
  const handleTransfer = () => {
    navigate("/transactions/transfer/" + id);
  };
  const handleBalanceCheck = () => {
    navigate("/transactions/balancecheck/" + id);
  };
  const handleMiniStatements = () => {
    navigate("/transactions/ministatements/" + id);
  };
  const handleChangePin = () => {
    navigate("/transactions/changepin/" + id);
  };

  return (
    <div>
      <ToastContainer />
      <div>
        <h3>Account Details</h3>
        <div>
          {account && <div> Account ID: {account?.id} </div>}
          {account && (
            <div>
              Account Type:{account?.type === 0 && "Savings"}
              {account?.type === 1 && "Current"}
              {account?.type === 2 && "Salary"}
            </div>
          )}
          {account && <div> Date of Creation: {account?.createdAt} </div>}
          {account && <div> Card Number: {account?.cardNumber} </div>}
          {account && <div> Balance: {account?.balance} </div>}
        </div>
        <div>{!account && <div>Unable to fetch account details</div>}</div>
      </div>

      {role == 0 && (
        <div>
          <h3>Please choose the type of transaction:</h3>

          <div>
            <button type="submit" value="Withdrawal" onClick={handleWithdrawal}>
              {" "}
              Withdrawal{" "}
            </button>
          </div>
          <div>
            <button type="submit" value="Deposit" onClick={handleDeposit}>
              {" "}
              Deposit{" "}
            </button>
          </div>
          <div>
            <button type="submit" value="Transfer" onClick={handleTransfer}>
              {" "}
              Transfer{" "}
            </button>
          </div>
          <div>
            <button
              type="submit"
              value="BalanceCheck"
              onClick={handleBalanceCheck}
            >
              {" "}
              Balance Check{" "}
            </button>
          </div>
          <div>
            <button
              type="submit"
              value="MiniStatements"
              onClick={handleMiniStatements}
            >
              {" "}
              Get Transaction History
            </button>
          </div>
          <div>
            <button type="submit" value="ChangePin" onClick={handleChangePin}>
              {" "}
              Change Pin
            </button>
          </div>
        </div>
      )}
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
export default GetspecAccount;
