import React, { useState, useContext } from "react";
import axios from "axios";
import validator from "validator";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { addcust } from "../Routes";
import "react-toastify/dist/ReactToastify.css";
const AddCustomerPage = () => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const { user, setUser } = useContext(AppContext);
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login")).token
  );
  const navigate = useNavigate();
  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleUserName = (event) => {
    setUserName(event.target.value);
  };
  const handleAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleCity = (event) => {
    setCity(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleContact = (event) => {
    setContact(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if(name.length<1 || name.length>50)
      {
        setError("Name must be between 1 to 50 characters");
        toast.error("Name must be between 1 to 50 characters");
        setName("");
      }
      else if(username.length<4 || username.length>20)
      {
        setError("Username must be between 4 to 20 characters");
        toast.error("Username must be between 4 to 20 characters");
        setUserName("");
      }
      else if(!/^[a-zA-Z0-9_.]+$/.test(username))
      {
        setError("Username contains invalid characters. Only letters, numbers, dots, and underscores are allowed");
        toast.error("Username contains invalid characters. Only letters, numbers, dots, and underscores are allowed");
        setUserName("");
      }
      else if (address.length<1 || address.length>150) {
        setError("Address must be between 1 to 150 characters");
        toast.error("Address must be between 1 to 150 characters");
        setAddress("");
      }
      else if (city.length<1 || city.length>15) {
        setError("City must be between 1 to 15 characters");
        toast.error("City must be between 1 to 15 characters");
        setCity("");
      }
      else if (!/^\d{10}$/.test(contact)) {
        setError("Enter a valid contact number");
        toast.error("Enter a valid contact number");
        setContact("");
      }
      else if(password.length<3 || password.length>16)//password must 
      {
        setError("Password must be between 3 to 16 characters");
        toast.error("Password must be between 3 to 16 characters");
        setPassword("");
      }
      else if (!validator.isEmail(email)) {
        setError("Enter a valid email address");
        toast.error("Enter a valid email address");
        setEmail("");
      } else {
        const res = {
          name: name,
          userName: username,
          useraddress: address,
          city: city,
          email: email,
          contact: contact,
          password: password,
        };

        setToken(user.token);
        const headers = { Authorization: `Bearer${user.token}` };
        console.log(headers);
        console.log(res);
        axios
          .post(addcust, res, {
            headers,
          })
          //.get('./data.json')
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              console.log(response);
              toast.success("Customer added successfully");
              setName("");
              setUserName("");
              setAddress("");
              setCity("");
              setEmail("");
              setContact("");
              setPassword("");
              navigate("/navigateadmin");
            } else {
              toast.error("Registration failed");
            }
          });
      }
    } catch (error) {
      toast.error("Registration failed" + error.Message);
      setError(error.Message);
    }
  };
  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div>
          Name:{" "}
          <input
            type="text"
            value={name}
            onChange={handleName}
            placeholder="Enter Name"
          />
        </div>
        <div>
          User Name:{" "}
          <input
            type="text"
            value={username}
            onChange={handleUserName}
            placeholder="Enter User Name"
          />
        </div>
        <div>
          Address:{" "}
          <input
            type="text"
            value={address}
            onChange={handleAddress}
            placeholder="Enter Customer Address"
          />
        </div>
        <div>
          City:{" "}
          <input
            type="text"
            value={city}
            onChange={handleCity}
            placeholder="Enter Customer City"
          />
        </div>
        <div>
          Email:{" "}
          <input
            type="text"
            value={email}
            onChange={handleEmail}
            placeholder="Enter Email id"
          />
        </div>
        <div>
          Contact:{" "}
          <input
            type="text"
            value={contact}
            onChange={handleContact}
            placeholder="Enter Contact Number"
          />
        </div>
        <div>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={handlePassword}
            placeholder="Enter Password"
          />
        </div>
        <div>
          <button type="submit"> Submit </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomerPage;