import React, { useState, useContext } from "react";
import axios from "axios";
import validator from "validator";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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
      if (name.trim() == "") {
        alert("Name cannot be empty");
        return;
      }
      if (username.trim() == "") {
        alert("User Name cannot be empty");
        return;
      }
      if (address.trim() == "") {
        alert("Address cannot be empty");
        return;
      }
      if (city.trim() == "") {
        alert("City cannot be empty");
        return;
      }
      if (contact.trim() == "") {
        alert("Contact cannot be empty");
        return;
      }
      if (password.trim() == "") {
        alert("Password cannot be empty");
        return;
      }
      if (!validator.isEmail(email)) {
        alert("Enter a valid email address");
        return;
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
          .post("https://localhost:44307/api/Customer/Add", res, {
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
            required
          />
        </div>
        <div>
          User Name:{" "}
          <input
            type="text"
            value={username}
            onChange={handleUserName}
            placeholder="Enter User Name"
            required
          />
        </div>
        <div>
          Address:{" "}
          <input
            type="text"
            value={address}
            onChange={handleAddress}
            placeholder="Enter Customer Address"
            required
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
            required
          />
        </div>
        <div>
          Contact:{" "}
          <input
            type="text"
            pattern="[0-9]{10}"
            value={contact}
            onChange={handleContact}
            placeholder="Enter Contact Number"
            required
          />
        </div>
        <div>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={handlePassword}
            placeholder="Enter Password"
            required
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
