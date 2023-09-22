import React, { useState, useContext, useEffect } from "react";
import { BsFillTrashFill, BsBoxArrowUpRight } from "react-icons/bs";
import "./Table.css";
import { AppContext } from "../Context/AppContext";
export const AccountTable = ({ rows, deleteRow, viewRow }) => {
  const { user, setUser } = useContext(AppContext);
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>AccountId</th>
            <th>Type</th>
            <th>Card Number</th>
            <th>Balance</th>
            <th>View More</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.type}</td>
                <td>{row.cardNumber}</td>
                <td>{row.balance}</td>

                <td className="fit">
                  <span className="actions">
                    {user.role == 1 && (
                      <BsFillTrashFill
                        className="delete-btn"
                        onClick={() => deleteRow(row.id)}
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
  );
};
export default AccountTable;
