import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import "./NavbarComponent.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getcustbyemail } from "../Routes";

const NavbarComponentCustomer = () => {
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login"))
  );
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate("");
  var res = {};
  const [customer, setCustomer] = useState(null);
  const headers = { Authorization: `Bearer ${token}` };
  const id = user;
  console.log(id);
  const handleLogout = () => {
    setUser(null);
    toast.success(`User ${customer.name} logged out`);
    window.localStorage.removeItem("login");
    window.localStorage.removeItem("role");
  };
  const getcust = async () => {
    await axios
      .get(getcustbyemail + user, {
        headers,
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setCustomer(response.data);
          console.log(response.data);
          console.log("Fetched customer details successfully");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          toast.error(error.response.data);
        } else {
          toast.error(error);
        }
      });
    //console.log("Get Customer Details" + res.data);
  };

  useEffect(() => {
    getcust();
  }, []);
  return (
    <div>
      <ToastContainer/>
      <div className="navbar">
        <div className="navbar-contents">
          <ul>
            <li className="nav-link">
              {customer && (
                <NavLink to={`/getaccbyid/${customer.id}`}>
                  Get Account details
                </NavLink>
              )}
             
            </li>
            <li className="nav-link">
              <NavLink to="/login" onClick={handleLogout}>
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          {customer && <h1>Customer Details</h1>}

          {customer?.id && <div> Customer ID: {customer?.id} </div>}
          {customer?.name && <div> Customer Name: {customer?.name}</div>}
          {customer?.userName && (
            <div> Customer User Name: {customer?.userName} </div>
          )}
          {customer?.address && (
            <div> Customer Address: {customer?.address} </div>
          )}
          {customer?.city && <div> Customer City: {customer?.city} </div>}
          {customer?.email && <div> Email ID: {customer?.email} </div>}
          {customer?.contact && (
            <div> Contact Number: {customer?.contact} </div>
          )}
        </div>
        {/* <button onClick={() => navigate("/updatecustomer/" + id)}>
        Update Details
      </button> */}
      </div>
    </div>
  );
};

export default NavbarComponentCustomer;
