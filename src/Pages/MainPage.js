import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../Components/Table";
import { AppContext } from "../Context/AppContext";
const MainPage = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [rowToView, setRowToView] = useState(null);
  const [token, setToken] = useState("");
  const { user, setUser } = useContext(AppContext);
  useEffect(() => {
    setToken(user.token);
  }, [user.token]);
  if (!user.token) navigate("/");
  const handleDeleteRow = async (idx) => {
    const headers = { Authorization: `Bearer${user.token}` };
    console.log(headers);
    await axios.delete("https://localhost:7104/api/deletecustomer/" + idx, {
      headers,
    });
    console.log("User deleted successfully!");
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
    axios
      .get("https://localhost:44307/api/Customer/GetAll")
      .then((res) => setRows(res.data));
  }, []);
  return (
    <div>
      <button className="btn" onClick={handleAdd}>
        Add Customer
      </button>
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
