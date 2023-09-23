import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getcustomer, updatedetails } from "../Routes";
const UpdateCustomerPage = () => {
  const [customer, setCustomer] = useState({});
  const { user, setUser } = useContext(AppContext);
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login")).token
  );
  const { id } = useParams();
  const navigate = useNavigate();
  const headers = { Authorization: `Bearer${token}` };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  var res = {};
  const getcust = async () => {
    res = await axios.get(getcustomer + id, {
      headers,
    });
    setCustomer(res.data);
  };
  useEffect(() => {
    getcust();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.put(updatedetails + id, customer, { headers });
    setCustomer(response.data);
    toast.success("Updated details successfully");
    console.log("Updated Customer details:" + response.data);
    if (user.role != 0) navigate("/navigateadmin");
    else navigate("/navigatecustomer");
  };
  return (
    <div>
      <ToastContainer />
      <h4>Update Customer details</h4>
      <form onSubmit={handleSubmit}>
        {customer && (
          <div>
            Name:{" "}
            <input
              type="text"
              name="name"
              value={customer.name}
              onChange={handleChange}
              required
            />
          </div>
        )}
        {customer && (
          <div>
            Address:{" "}
            <input
              type="text"
              name="address"
              value={customer.address}
              onChange={handleChange}
              required
            />
          </div>
        )}
        {customer && (
          <div>
            City:{" "}
            <input
              type="text"
              name="city"
              value={customer.city}
              onChange={handleChange}
            />
          </div>
        )}
        {customer && (
          <div>
            Email:{" "}
            <input
              type="text"
              name="email"
              value={customer.email}
              onChange={handleChange}
              required
            />
          </div>
        )}
        {customer && (
          <div>
            Contact:{" "}
            <input
              type="text"
              pattern="[0-9]{10}"
              name="contact"
              value={customer.contact}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {customer && <button type="submit">Update</button>}
      </form>
    </div>
  );
};
export default UpdateCustomerPage;
