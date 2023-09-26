//update customer for admin
import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getcustbyemail, updatedetails, getcustomer } from "../Routes";

const UpdateAdmin = () => {
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

  const { id } = useParams();

  const getcust = async () => {
    await axios
      .get(getcustomer + id, {
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
    } else if (!validator.isEmail(customer.email)) {
      setError("Enter a valid email address");
      toast.error("Enter a valid email address");
      setCustomer.email("");
    } else if (customer.governmentId.length < 1) {
      setError("Government ID cannot be empty");
      toast.error("Government ID cannot be empty");
      setCustomer.governmentId("");
    } else {
      await axios
        .put(updatedetails + id, customer, {
          headers,
        })
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            setCustomer(response.data);
            console.log("Updated Customer details!");
            toast.success("Updated Customer details! Redirecting...", {
              onClose: () => {
                navigate("/navigateadmin");
              },
            });
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 500) {
            toast.error(error.response.data);
          } else {
          }
          toast.error(error.Message);
        });
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
              disabled
              value={customer.contactNumber}
              onChange={handleChange}
            />
          </div>
        )}
        {customer && localStorage.getItem("role") == "1" && (
          <div id="fieldcontainer">
            Government ID:{" "}
            <input
              type="text"
              name="governmentid"
              id="conditionalfield"
              disabled
              value={customer.governmentId}
              onChange={handleChange}
            />
          </div>
        )}

        {customer && <button type="submit">Update</button>}
      </form>
      <buton
        type="submit"
        onClick={() => navigate("/navigateadmin")}
        style={{ color: "blue", border: "10px" }}
      >
        Go Back
      </buton>
    </div>
  );
};
export default UpdateAdmin;
