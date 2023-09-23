import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginPage.css";
import { authorize } from "../Routes";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setpwd] = useState("");
  const [login, setLogin] = useState(false);
  const { user, setUser } = useContext(AppContext);
  const [userType, setuserType] = useState(0);
  const [Error, setError] = useState("");
  const navigate = useNavigate();

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlepwd = (event) => {
    setpwd(event.target.value);
  };
  const handleSubmit = async (event) => {
    const res = {
      username: username,
      password: password,
      role: userType,
    };
    event.preventDefault();
    if(username.length<4 || username.length>20)
    {
      setError("Username must be between 4 to 20 characters");
      toast.error("Username must be between 4 to 20 characters");
      setpwd("");
      setUsername("");
    }
    else if(!/^[a-zA-Z0-9_.]+$/.test(username))
    {
      setError("Username contains invalid characters. Only letters, numbers, dots, and underscores are allowed");
      toast.error("Username contains invalid characters. Only letters, numbers, dots, and underscores are allowed");
      setpwd("");
      setUsername("");
    }
    else if(password.length<3 || password.length>16)//password must 
    {
      setError("Password must be between 3 to 16 characters");
      toast.error("Password must be between 3 to 16 characters");
      setpwd("");
      setUsername("");
    }
    else{
      try {
        const response = await axios.post(authorize, res);
        if (response.status >= 200 && response.status < 300) {
          setLogin(true);
          setUser(response.data);
          window.localStorage.setItem("login", JSON.stringify(response.data));
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
      } catch (error) {
        toast.error("Login failed: " + error.message);//error message
        console.log(error);
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
          Username:{" "}
          <input
            type="text"
            placeholder="Enter User Name"
            value={username}
            onChange={handleUsername}
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