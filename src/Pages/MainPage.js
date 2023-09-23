import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../Components/Table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getcusts } from "../Routes";
const MainPage = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [rowToView, setRowToView] = useState(null);
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login")).token
  );
  const headers = { Authorization: `Bearer${token}` };
  //console.log(headers);
  const handleDeleteRow = async (idx) => {
    await axios.delete("" + idx, {
      headers,
    });
    console.log("User deleted successfully!");
    toast.success("User deleted successfully!");
  };

  const handleAdd = () => {
    navigate("/addcustomer");
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    navigate(`/updatecustomer/${idx}`);
  };

  const handleViewRow = (idx) => {
    setRowToView(idx);
    navigate(`/getcustomer/${idx}`);
  };
  useEffect(() => {
    axios.get(getcusts).then((res) => setRows(res.data));
  }, []);

  return (
    <div>
      <ToastContainer />
      <Table
        rows={rows}
        deleteRow={handleDeleteRow}
        editRow={handleEditRow}
        viewRow={handleViewRow}
      />
    </div>
  );
};
export default MainPage;
