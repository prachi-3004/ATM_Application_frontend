import { hover } from '@testing-library/user-event/dist/hover';
import React, {useContext} from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from '../Context/AppContext';
import "./NavbarComponent.css";
const NavbarComponent = () => {
  //const navigate = useNavigate();
  
  const {user,setUser}=useContext(AppContext);
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
    </div>
  );
 }

export default NavbarComponent;