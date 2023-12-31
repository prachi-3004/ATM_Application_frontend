//Change pin for customer
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getaccbyid, changepin } from "../Routes";
const ChangePinPage = () => {
  const [account, setAccount] = useState([]);
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login"))
  );
  const [Error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const headers = { Authorization: `Bearer ${token}` };
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const handleOldPasswod = (event) => {
    setOldPassword(event.target.value);
  };
  const handleNewPassword = (event) => {
    //console.log(event.target.value);
    setNewPassword(event.target.value);
  };

  const handleConfirmPassword = (event) => {
    //console.log(event.target.value);
    setConfirmPassword(event.target.value);
  };

  const getAccount = async () => {
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
    getAccount();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newpassword !== confirmpassword) {
        toast.error("Both passwords doesnt match");
        setNewPassword("");
        setConfirmPassword("");
      } else if (newpassword.length !== 4 || confirmpassword.length !== 4) {
        toast.error("Password must be 4 characters long");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        await axios
          .put(
            changepin + id,
            { oldPin: oldpassword, newPin: newpassword },
            { headers }
          )
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              console.log(response);
              toast.success("Pin change successful!", {
                onClose: () => {
                  navigate("/getaccountspec/" + id);
                },
              });
            } else {
              toast.error("Pin change failed");
            }
          })
          .catch((error) => {
            if (error.response && error.response.status === 500) {
              toast.error("Mismatch of old pin ");
              setOldPassword("");
            } else {
              toast.error(error.response.data);
            }
          });
      }
    } catch (error) {
      setError(error.Message);
      toast.error(error.Message);
    }
  };
  return (
    <div>
      <ToastContainer />
      <h1>Change your ATM pin</h1>
      <div className="formdiv">
        <form onSubmit={handleSubmit}>
          <div className="forminsidediv">
            <label>Enter old pin: </label>
            <input
              type="password"
              value={oldpassword}
              placeholder="Enter your old pin"
              onChange={handleOldPasswod}
              required
            />
          </div>
          <div className="forminsidediv">
            <label>Enter new pin: </label>
            <input
              type="password"
              value={newpassword}
              placeholder="Enter your new pin"
              onChange={handleNewPassword}
              required
            />
          </div>
          <div className="forminsidediv">
            <label> Confirm your new pin: </label>
            <input
              type="password"
              value={confirmpassword}
              placeholder="Enter new pin again"
              onChange={handleConfirmPassword}
              required
            />
          </div>
          <br />
          <div>
            <button type="submit"> Change </button>
          </div>
        </form>
      </div>
      <br />
      <button type="submit" onClick={() => navigate("/getaccountspec/" + id)}>
        Go Back
      </button>
    </div>
  );
};

export default ChangePinPage;
