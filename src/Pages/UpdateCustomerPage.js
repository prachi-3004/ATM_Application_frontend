import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import validator from "validator";
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
  const [Error, setError] = useState("");

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
    if(customer.name.length<1 || customer.name.length>50)
    {
      setError("Name must be between 1 to 50 characters");
      toast.error("Name must be between 1 to 50 characters");
      setCustomer.name("");
    }
    else if (customer.address.length<1 || customer.address.length>150) {
      setError("Address must be between 1 to 150 characters");
      toast.error("Address must be between 1 to 150 characters");
      setCustomer.address("");
    }
    else if (customer.city.length<1 || customer.city.length>15) {
      setError("City must be between 1 to 15 characters");
      toast.error("City must be between 1 to 15 characters");
      setCustomer.city("");
    }
    else if (!/^\d{10}$/.test(customer.contact)) {
      setError("Enter a valid contact number");
      toast.error("Enter a valid contact number");
      setCustomer.contact("");
    }
    else if(customer.password.length<3 || customer.password.length>16)//password must 
    {
      setError("Password must be between 3 to 16 characters");
      toast.error("Password must be between 3 to 16 characters");
      setCustomer.password("");
    }
    else if (!validator.isEmail(customer.email)) {
      setError("Enter a valid email address");
      toast.error("Enter a valid email address");
      setCustomer.email("");
    }
    else{
      const response = await axios.put(updatedetails + id, customer, { headers });
      setCustomer(response.data);
      // console.log("Updated Customer details:" + response.data);
      if (user.role != 0)
      {
        toast.success("Updated customer details successfully. Redirecting to Admin Page.", {
          onClose: () => {
            navigate('/navigateadmin'); // Replace with the path to your target page
          },
        });
      }
      else
      {
        toast.success("Updated customer details successfully. Redirecting to Customer Page", {
          onClose: () => {
            navigate("/navigatecustomer");; // Replace with the path to your target page
          },
        });
      }
      
    }
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
            />
          </div>
        )}

        {customer && <button type="submit">Update</button>}
      </form>
    </div>
  );
};
export default UpdateCustomerPage;