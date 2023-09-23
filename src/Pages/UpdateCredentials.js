import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getcustomer, updatecredentials } from "../Routes";
const UpdateCredentials = () => {
  const [customer, setCustomer] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login")).token
  );
  const headers = { Authorization: `Bearer${token}` };
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };
  const getcust = async () => {
    const res = await axios.get(getcustomer + id, {
      headers,
    });
    //console.log(res.data);
    setCustomer(res.data);
  };

  useEffect(() => {
    getcust();
  }, [id]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = {
      userName: customer.userName,
      password: customer.password,
      role: 0,
    };
    const response = await axios.put(updatecredentials + id, res, { headers });
    //setCustomer(response.data);

    console.log("Updated Customer details:" + response.data);
    toast.success("updated successfully");
    navigate("/navigatecustomer");
  };
  return (
    <div>
      <ToastContainer />
      <h4>Update Customer Credentials</h4>
      <form onSubmit={handleSubmit}>
        <div>
          Enter UserName:{" "}
          <input
            type="text"
            name="userName"
            value={customer.userName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          Enter Password:{" "}
          <input
            type="password"
            name="password"
            value={customer.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateCredentials;