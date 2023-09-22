import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import MainPage from "../Pages/MainPage";
import "./NavbarComponent.css";
const NavbarComponent = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext);
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(user.token);
  }, [user.token]);
  if (!user.token) navigate("/");

  return (
    <div>
      <div className="navbar">
        <div className="navbar-contents">
          <ul>
            <li className="nav-link">
              <NavLink to="/addcustomer">Add Customer</NavLink>
            </li>
            {/* <li className="nav-link">
              <NavLink to="/customer/getcustomer">Get Customerdetails</NavLink>
            </li>
            <li className="nav-link"><NavLink to="/updatecustomer">Update Customer</NavLink></li>
        <li className="nav-link"><NavLink to="/deletecustomer/">Delete Customer</NavLink></li> */}
            <li className="nav-link">
              <NavLink to="/login" onClick={() => setUser(null)}>
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <h1>Welcome Admin</h1>
      <MainPage />
    </div>
  );
};

export default NavbarComponent;
