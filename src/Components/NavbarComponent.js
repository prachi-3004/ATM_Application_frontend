//Navbar Component for admin login

import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import MainPage from "../Pages/MainPage";
import "./NavbarComponent.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const NavbarComponent = () => {
  const { user, setUser } = useContext(AppContext);
  const handleLogout = () => {
    setUser(null);
    toast.success("Logged out successfully");
    window.localStorage.removeItem("login");
    window.localStorage.removeItem("role");
  };

  return (
    <div>
      <ToastContainer />
      <div className="navbar">
        <div className="navbar-contents">
          <ul>
            <li classsName="nav-link">
              <NavLink to="/navigateadmin">Welcome Admin</NavLink>
            </li>
            <li className="nav-link">
              <NavLink to="/addcustomer">Add Customer</NavLink>
            </li>
            <li className="nav-link">
              <NavLink to="/getallaccounts">Get All Accounts</NavLink>
            </li>
            <li className="nav-link">
              <NavLink to="/login" onClick={handleLogout}>
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
