import axios from 'axios';
import React, {useContext,useState,useEffect} from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from '../Context/AppContext';
import "./NavbarComponent.css";
const NavbarComponent = () => {
  //const navigate = useNavigate();
  //const [custCount,setcustCount]=useState(0);
  const {user,setUser}=useContext(AppContext);
  // const getcustCount= async()=>{
  //   await axios.get('').then((res)=>{setcustCount(res.data)});
  // }
  // useEffect(()=>{getcustCount()},[]);
  return (
    <div>
    <div className="navbar">
      <div className="navbar-contents">
      <ul>
        <li className="nav-link"><NavLink to="/addcustomer">Add Customer</NavLink></li>
        <li className="nav-link"><NavLink to="/customer/getcustomer">Get Customerdetails</NavLink></li>
        <li className="nav-link"><NavLink to="/updatecustomer">Update Customer</NavLink></li>
        <li className="nav-link"><NavLink to="/deletecustomer/">Delete Customer</NavLink></li>
        <li className="nav-link"><NavLink to="/login" onClick={()=>setUser(null)}>Logout</NavLink></li>
       </ul>

      </div>
    </div>
    <h1>Welcome Admin</h1>
    {/* <div className="row">
      <div className="col">
        <div className="grid">
          <span className="heading">Customers Registered</span>
          <br/>
          <span className="value">{custCount}</span>
        </div>
      </div>
    </div> */}
    </div>
  );
 }

export default NavbarComponent;