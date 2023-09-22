import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import MainPage from "../Pages/MainPage";
import "./NavbarComponent.css";
const NavbarComponent = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext);
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login")).token
  );
  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("login");
  };

  return (
    <div>
      <div className="navbar">
        <div className="navbar-contents">
          <ul>
            <li className="nav-link">
              <NavLink to="/addcustomer">Add Customer</NavLink>
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
