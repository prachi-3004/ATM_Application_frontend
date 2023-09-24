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
  const [Error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };
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
  }, [id]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (customer.userName.length < 4 || customer.userNamelength > 20) {
      setError("Username must be between 4 to 20 characters");
      toast.error("Username must be between 4 to 20 characters");
      setCustomer.password("");
      setCustomer.userName("");
    } else if (customer.password.length < 3 || customer.password.length > 16) {
      //password must
      setError("Password must be between 3 to 16 characters");
      toast.error("Password must be between 3 to 16 characters");
      setCustomer.password("");
      setCustomer.userName("");
    } else {
      const res = {
        userName: customer.userName,
        password: customer.password,
        role: 0,
      };
      await axios
        .put(updatecredentials + id, res, {
          headers,
        })
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            console.log("Updated Customer details:" + response.data);
            toast.success("updated successfully");
            navigate("/navigatecustomer");
          } else {
            toast.error(response.data);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data);
        });
    }
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
