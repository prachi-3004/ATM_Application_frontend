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

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>UserId</th>
              <th>Name</th>
              <th>UserName</th>
              <th>City</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              return (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.userName}</td>
                  <td>{row.city}</td>
                  <td>{row.email}</td>
                  <td>{row.contact}</td>
                  <td className="fit">
                    <span className="actions">
                      <BsFillTrashFill
                        className="delete-btn"
                        onClick={() => {
                          deleteRow(row.id);
                          toast.success(row.name + "deleted successfully");
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
    </div>
  );
};
export default Table;