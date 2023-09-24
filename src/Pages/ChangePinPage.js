import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getaccbyid } from "../Routes";
const ChangePinPage = () => {
  const [account, setAccount] = useState([]);
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login")).token
  );
  const [Error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const headers = { Authorization: `Bearer${token}` };

  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

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
        const request = {
          id: id,
          newPin: newpassword,
        };
        console.log(request);
        await axios
          .put(
            `https://localhost:44307/api/Account/ChangePin/${id}?newPin=${newpassword}`,
            headers
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
            toast.error(error.response.data);
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
      <form onSubmit={handleSubmit}>
        <div>
          Enter new password:{" "}
          <input
            type="password"
            value={newpassword}
            placeholder="Enter your new password"
            onChange={handleNewPassword}
            required
          />
        </div>
        <div>
          Confirm your new password:{" "}
          <input
            type="password"
            value={confirmpassword}
            placeholder="Enter password again"
            onChange={handleConfirmPassword}
            required
          />
        </div>
        <br />
        <div>
          <button type="submit"> Change </button>
        </div>
      </form>
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

export default ChangePinPage;
