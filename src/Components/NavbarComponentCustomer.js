import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import "./NavbarComponent.css";
const NavbarComponentCustomer = () => {
  const [Token, setToken] = useState("");
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate("");
  var res = {};
  useEffect(() => {
    setToken(user.token);
  }, [user.token]);
  if (!user.token) navigate("/");
  const [customer, setCustomer] = useState(null);
  const headers = { Authorization: `Bearer${user.token}` };
  let id = 102;
  const getcust = async () => {
    res = await axios.get("https://localhost:44307/api/Customer/Get/" + id, {
      headers,
    });
    console.log(res.data);
    setCustomer(res.data);
  };
  console.log(customer);
  useEffect(() => {
    getcust();
  }, []);
  return (
    <div>
      <div className="navbar">
        <div className="navbar-contents">
          <ul>
            {/* <li className="nav-link"><NavLink to="/">Update Details</NavLink></li>
        <li className="nav-link"><NavLink to="/">Update Account details</NavLink></li> */}
            <li className="nav-link">
              <NavLink to={`/getaccountdetails/${id}`}>
                Get Account details
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink to="/login" onClick={() => setUser(null)}>
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
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
        {customer?.contact && <div> Contact Number: {customer?.contact} </div>}
      </div>
      <button onClick={() => navigate("/updatecustomer/" + id)}>
        Update Details
      </button>
    </div>
  );
};

export default NavbarComponentCustomer;
