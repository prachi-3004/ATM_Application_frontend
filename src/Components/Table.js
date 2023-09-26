// Table Component for rendering customers
import React from "react";
import {
  BsFillTrashFill,
  BsFillPencilFill,
  BsBoxArrowUpRight,
} from "react-icons/bs";
import "./Table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Table = ({ rows, deleteRow, editRow, viewRow }) => {
  return (
    <div>
      <ToastContainer />

      {rows == null && <div>No customers registered yet</div>}
      {rows != null && (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>UserId</th>
                <th>Name</th>
                <th>City</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(rows).map((row, idx) => {
                return (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.city}</td>
                    <td>{row.email}</td>
                    <td>{row.contactNumber}</td>
                    <td className="fit">
                      <span className="actions">
                        <BsFillTrashFill
                          className="delete-btn"
                          onClick={() => {
                            deleteRow(row.id);
                          }}
                        />
                        <BsFillPencilFill
                          className="edit-btn"
                          onClick={() => editRow(row.id)}
                        />
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
export default Table;
