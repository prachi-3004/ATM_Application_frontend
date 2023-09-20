import React, {useContext} from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from '../Context/AppContext';
import "./NavbarComponent.css";
const CurrencyExchangeComponent = () => {
  //const navigate = useNavigate();
  
  const {user,setUser}=useContext(AppContext);
  return (
    <div className="currency-exchange">
      <select name="" id = "">
        <option value = "" 
      </select>
    </div>
  );
 }

export default CurrencyExchangeComponent;