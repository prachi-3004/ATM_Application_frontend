import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const GetspecAccount = () => {
  const [account, setAccount] = useState({});
  const { id } = useParams();
  const navigate = useNavigate("");
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login")).token
  );
  const headers = { Authorization: `Bearer${token}` };

  const getAcc = async () => {
    const res = await axios.get(
      "https://localhost:44307/api/Account/GetAccountByID/" + id,
      {
        headers,
      }
    );

    setAccount(res.data);
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
      <div>
        <h3>Account Details</h3>
        <div>
          {account && <div> Account ID: {account?.id} </div>}
          {account && <div> Account Type: {account?.type} </div>}
          {account && <div> Date of Creation: {account?.dateOfCreation} </div>}
          {account && <div> Card Number: {account?.cardNumber} </div>}
          {account && <div> Balance: {account?.balance} </div>}
        </div>
        <div>{!account && <div>Unable to fetch account details</div>}</div>
      </div>

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
    </div>
  );
};
export default GetspecAccount;
