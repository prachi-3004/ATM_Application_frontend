import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import {Button,Form,Grid,Header,Message,Segment,Container} from "semantic-ui-react";
const NavbarComponent = () => {
  //const navigate = useNavigate();
  return (
    <nav className="bg-white border-b-2 border-slate-200">
      <div className="flex items-center justify-between p-4">
        <NavLink   className={({ isActive }) =>
                    isActive
                      ? "p-2 px-6 text-white bg-slate-900 rounded-3xl"
                      : "p-2 px-6 text-slate-900 hover:cursor-pointer hover:bg-slate-100 rounded-3xl"
                  }
                  to="/">
          Add Customer
        </NavLink>
      </div>
    </nav>
  );
 }

export default NavbarComponent;