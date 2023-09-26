// Component to render account details in a table

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

      {rows && (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>AccountId</th>
                {role == 1 && <th>Customer Id</th>}
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
                    {role == 1 && <td>{row.customerId}</td>}
                    {row.type === 0 && <td>Savings</td>}
                    {row.type === 1 && <td>Current</td>}
                    {row.type === 2 && <td>Salary</td>}
                    <td>{row.cardNumber}</td>
                    <td>{row.balance}</td>

                    <td className="fit">
                      <span className="actions">
                        {role == 1 && (
                          <BsFillTrashFill
                            className="delete-btn"
                            onClick={() => {
                              deleteRow(row.id);
                            }}
                          />
                        )}

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
        </div>
      )}
    </div>
  );
};
export default AccountTable;
