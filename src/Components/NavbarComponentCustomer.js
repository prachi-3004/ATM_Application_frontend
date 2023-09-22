import { hover } from '@testing-library/user-event/dist/hover';
import React, {useContext} from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from '../Context/AppContext';
import "./NavbarComponent.css";
const NavbarComponentCustomer = () => {
  //const navigate = useNavigate();
  
  const {user,setUser}=useContext(AppContext);
  return (
    <div className="navbar">
      <div className="navbar-contents">
      <ul>
        <li className="nav-link"><NavLink to="/">Update Details</NavLink></li>
        <li className="nav-link"><NavLink to="/">Update Account details</NavLink></li>
        <li className="nav-link"><NavLink to="/">Get Account details</NavLink></li>
        <li className="nav-link"><NavLink to="/transactions">Transactions</NavLink></li>

        <li className="nav-link"><NavLink to="/login" onClick={()=>setUser(null)}>Logout</NavLink></li>
       </ul>

      </div>
    </div>
  );
 }

export default NavbarComponentCustomer;