import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCustomerPage = () => {
  const [customer, setCustomer] = useState({});
  const { user, setUser } = useContext(AppContext);
  const [token, setToken] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const headers = { Authorization: `Bearer${user.token}` };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  var res = {};
  useEffect(() => {
    setToken(user.token);
  }, [user.token]);
  if (!user.token) navigate("/");

  const getcust = async () => {
    res = await axios.get("https://localhost:44307/api/Customer/" + id, {
      headers,
    });
    setCustomer(res.data);
  };
  useEffect(() => {
    getcust();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(customer);
    const response = await axios.put(
      "https://localhost:44307/api/Customer/" + id,
      customer,
      { headers }
    );
    setCustomer(response.data);
    //console.log(response.data);
    console.log(customer);
    navigate("/navigateadmin");
  };
  return (
    <div>
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
