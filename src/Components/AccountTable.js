import React, { useState, useContext, useEffect } from "react";
import { BsFillTrashFill, BsBoxArrowUpRight } from "react-icons/bs";
import "./Table.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const AccountTable = ({ rows, deleteRow, viewRow }) => {
  const [role, setRole] = useState(
    JSON.parse(window.localStorage.getItem("role"))
  );
 
  return (
    <div>
      <ToastContainer />

      {rows&& <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>AccountId</th>
              <th>Type</th>

              <th>Card Number</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              return (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  {row.type===0 && (<td>Savings</td>)}
                {row.type===1 && (<td>Current</td>)}
                {row.type===2 && (<td>Salaried</td>)}
                  <td>{row.cardNumber}</td>
                  <td>{row.balance}</td>

                  <td className="fit">
                    <span className="actions">
                      
                        {role==1 &&<BsFillTrashFill
                          className="delete-btn"
                          onClick={() => {
                            deleteRow(row.id);
                            toast.info("Deleted account");
                          }}
                        />}
                      

                      <BsBoxArrowUpRight
                        className="view-btn"
                        onClick={() => viewRow(row.id)}
                      />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>}
    </div>
  );
};
export default AccountTable;
