import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { AppContext } from "../Context/AppContext";

const ChangePinPage = () => {
  const { user, setUser } = useContext(AppContext);
  const [account, setAccount] = useState([]);
  const [token, setToken] = useState("");
  const [Error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  var res = {};

  useEffect(() => {
    setToken(user.token);
  }, [user.token]);
  if (user.token == null) navigate("/");
  const headers = { Authorization: `Bearer${user.token}` };

  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const handleOldPassword = (event) => {
    console.log(event.target.value);
    setOldPassword(event.target.value);
  };

  const handleNewPassword = (event) => {
    console.log(event.target.value);
    setNewPassword(event.target.value);
  };

  const handleConfirmPassword = (event) => {
    console.log(event.target.value);
    setConfirmPassword(event.target.value);
  };

  const getAccount = async () => {
    res = await axios.get(
      "https://localhost:44307/api/Account/GetAccountByID/" + id,
      {
        headers,
      }
    );
    console.log("resdata" + res.data);
    setAccount(res.data);
  };

  useEffect(() => {
    getAccount();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newpassword != confirmpassword) {
        alert("Confirm Password does not match New Password. Try again.");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const request = {
          id: id,
          newPin: newpassword,
        };
        console.log(request);
        await axios
          .put(
            `https://localhost:44307/api/Account/ChangePin/${id}?newPin=${newpassword}`,
            headers
          ) //change
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              console.log(response);
              alert("Pin change successful!");
            } else {
              alert("Pin change failed");
            }
          });
      }
    } catch (error) {
      setError(error.Message);
    }
  };
  return (
    <div>
      <h1>Change your ATM pin</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Enter current password:{" "}
          <input
            type="password"
            value={oldpassword}
            onChange={handleOldPassword}
            required
          />
        </div>
        <div>
          Enter new password:{" "}
          <input
            type="password"
            value={newpassword}
            onChange={handleNewPassword}
            required
          />
        </div>
        <div>
          Confirm your new password:{" "}
          <input
            type="password"
            value={confirmpassword}
            onChange={handleConfirmPassword}
            required
          />
        </div>
        <br />
        <div>
          <button type="submit"> OK </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePinPage;
