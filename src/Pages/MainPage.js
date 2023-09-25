import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../Components/Table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getcusts,getcustomer,deletecustomer } from "../Routes";
const MainPage = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [rowToView, setRowToView] = useState(null);
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login"))
  );
  const headers = { Authorization: `Bearer ${token}` };
  const [customer,setCustomer]=useState('');
  const getcust = async(idx) => {
    await axios
      .get(getcustomer + idx, {
        headers,
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data);
          setCustomer(response.data);
        } else {
          toast.error(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.Message);
      });
  };
  const handleDeleteRow = async (idx) => {
getcust(idx);
    await axios
      .put(deletecustomer + customer.email, {
        headers,
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log("User disabled successfully!");
          toast.success(`${customer.name} disabled successfully!`);
        } else {
          toast.error(response.data);
        }
      })
      .catch((err) => {
        if(err.response && err.response.status===500){
          toast.error(err.response.data);
        }
        else{
        toast.error(err.Message);
        }
      });
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
    axios.get(getcusts, { headers }).then((res) => {
      setRows(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div>
      <ToastContainer />
      {rows!=null && <Table
        rows={rows}
        deleteRow={handleDeleteRow}
        editRow={handleEditRow}
        viewRow={handleViewRow}
      />}
    </div>
  );
};
export default MainPage;
