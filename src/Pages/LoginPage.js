import React, { useContext, useState } from "react";
import axios from "axios";
import validator from "validator";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginPage.css";
import { authorize } from "../Routes";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setpwd] = useState("");
  const [login, setLogin] = useState(false);
  const { user, setUser } = useContext(AppContext);
  const [userType, setuserType] = useState(0);
  const [Error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlepwd = (event) => {
    setpwd(event.target.value);
  };
  const handleSubmit = async (event) => {
    const res = {
      email: email,
      password: password,
      role: userType,
    };
    event.preventDefault();
    if (password.length < 3 || password.length > 16) {
      //password must
      setError("Password must be between 3 to 16 characters");
      toast.error("Password must be between 3 to 16 characters");
      setpwd("");
      setEmail("");
    }
    else if (!validator.isEmail(email)) {
      setError("Enter a valid email address");
      toast.error("Enter a valid email address");
      setEmail("");
    } 
    else {
      try {
        axios
          .post(authorize, res)
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              setLogin(true);
              setUser(response.data);
              window.localStorage.setItem(
                "login",
                JSON.stringify(response.data)
              );
              if (res.role == 1) {
                toast.success("Admin Login Successful");
                navigate("/navigateadmin");
              } else if (res.role == 0) {
                toast.success("Customer Login Successful");
                navigate("/navigatecustomer");
              } else {
                toast.error("Login Error.Please check credentials");
              }
            }
          })
          .catch((error) => {
            if (error.response && error.response.status === 500) {
              console.log(error.response.data);
              toast.error("Invalid Login");
              setEmail("");
              setpwd("");
            } else {
              toast.error("Login failed: " + error.message); //error message
              console.log(error);
            }
          });
      } catch (error) {
        console.log(error.Message);
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <h1>Login to ATM Banking</h1>
      <form className="loginform" onSubmit={handleSubmit}>
        <div>
          Login as:
          <label>
            <input
              type="radio"
              value="Customer"
              checked={userType === 0}
              onChange={() => setuserType(0)}
            />
            Customer
          </label>
          <label>
            <input
              type="radio"
              value="Employee"
              checked={userType === 1}
              onChange={() => setuserType(1)}
            />
            Admin
          </label>
        </div>
        <br />
        <div>
          email:{" "}
          <input
            type="email"
            placeholder="Enter User Email"
            value={email}
            onChange={handleEmail}
          />
        </div>

        <br />
        <div>
          Password:{" "}
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={handlepwd}
          />
        </div>

        <br />
        <div>
          <button type="submit" className="btn">
            {" "}
            Login{" "}
          </button>
        </div>
      </form>
      <br />
    </div>
  );
};

export default LoginPage;
