//update credentials for customer
import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getcustbyemail, updatedetails } from "../Routes";

const UpdateCustomerPage = () => {
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login"))
  );

  //const { email } = useParams();
  const navigate = useNavigate();
  const headers = { Authorization: `Bearer ${token}` };
  const [customer, setCustomer] = useState({});
  const { user, setUser } = useContext(AppContext);

  const [Error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  var res = {};
  const getcust = async () => {
    await axios
      .get(getcustbyemail + user, {
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
        toast.error(err.response.data);
      });
  };
  useEffect(() => {
    getcust();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (customer.name.length < 1 || customer.name.length > 50) {
      setError("Name must be between 1 to 50 characters");
      toast.error("Name must be between 1 to 50 characters");
      setCustomer.name("");
    } else if (customer.address.length < 1 || customer.address.length > 150) {
      setError("Address must be between 1 to 150 characters");
      toast.error("Address must be between 1 to 150 characters");
      setCustomer.address("");
    } else if (customer.city.length < 1 || customer.city.length > 15) {
      setError("City must be between 1 to 15 characters");
      toast.error("City must be between 1 to 15 characters");
      setCustomer.city("");
    } else if (!/^\d{10}$/.test(customer.contactNumber)) {
      setError("Enter a valid contact number");
      toast.error("Enter a valid contact number");
      setCustomer.contact("");
    } else if (customer.password.length < 3 || customer.password.length > 16) {
      setError("Password must be between 3 to 16 characters");
      toast.error("Password must be between 3 to 16 characters");
      //setCustomer.password("");
    } else if (!validator.isEmail(customer.email)) {
      setError("Enter a valid email address");
      toast.error("Enter a valid email address");
      setCustomer.email("");
    } else if (customer.governmentId.length < 1) {
      setError("Government ID cannot be empty");
      toast.error("Government ID cannot be empty");
      setCustomer.governmentId("");
    } /*else if (!customer.dateOfBirth) {
      setError("Date of Birth cannot be empty");
      toast.error("Date of Birth cannot be empty");
    } */ else {
      await axios
        .put(updatedetails + customer.id, customer, {
          headers,
        })
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            setCustomer(response.data);
            console.log("Updated Customer details!");

            if (localStorage.getItem("role").localeCompare("0") == 0) {
              console.log(localStorage.getItem("role"));
              toast.success(
                "Updated customer details successfully. Redirecting...",
                {
                  onClose: () => {
                    navigate("/navigatecustomer");
                  },
                }
              );
            }
          } else {
            toast.success("Updated details successfully.\nRedirecting...", {
              onClose: () => {
                navigate("/navigatecustomer");
              },
            });
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 500) {
            toast.error("Email id already existing");
          } else {
          }
          toast.error(error.Message);
        });
    }
  };
  return (
    <div>
      <ToastContainer />
      <h1>Update Customer details</h1>
      <div className="formdiv">
        <form onSubmit={handleSubmit}>
          {customer && (
            <div className="forminsidediv">
              <label>Name: </label>
              <input
                type="text"
                name="name"
                value={customer.name}
                onChange={handleChange}
              />
            </div>
          )}
          {customer && (
            <div className="forminsidediv">
              <label>Address: </label>
              <input
                type="text"
                name="address"
                disabled
                value={customer.address}
                onChange={handleChange}
              />
            </div>
          )}
          {customer && (
            <div className="forminsidediv">
              <label>City: </label>
              <input
                type="text"
                name="city"
                disabled
                value={customer.city}
                onChange={handleChange}
              />
            </div>
          )}
          {customer && (
            <div className="forminsidediv">
              <label>Email: </label>
              <input
                type="text"
                name="email"
                disabled
                value={customer.email}
                onChange={handleChange}
              />
            </div>
          )}

          {customer && (
            <div className="forminsidediv">
              <label>Contact: \</label>
              <input
                type="text"
                pattern="[0-9]{10}"
                name="contact"
                disabled
                value={customer.contactNumber}
                onChange={handleChange}
              />
            </div>
          )}
          {customer && localStorage.getItem("role") == "0" && (
            <div className="forminsidediv">
              <label>Government ID: </label>
              <input
                type="text"
                name="governmentid"
                disabled
                value={customer.governmentId}
                onChange={handleChange}
              />
            </div>
          )}
          {customer && localStorage.getItem("role") == "0" && (
            <div className="forminsidediv">
              <label>Password: </label>
              <input type="password" name="password" onChange={handleChange} />
            </div>
          )}
          {customer && <button type="submit">Update</button>}
        </form>
      </div>
      <button type="submit" onClick={() => navigate("/navigatecustomer")}>
        Go Back
      </button>
    </div>
  );
};
export default UpdateCustomerPage;
