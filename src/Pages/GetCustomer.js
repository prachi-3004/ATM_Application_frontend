import React, { useState, useContext, useEffect } from "react";
import { getcustomer } from "../Routes";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const GetCustomer = () => {
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login")).token
  );
  const { id } = useParams();
  const navigate = useNavigate();
  var res = {};

  const [customer, setCustomer] = useState({});
  const headers = { Authorization: `Bearer${token}` };

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
  const handleaddAccount = async () => {
    navigate("/createaccount/" + id);
  };
  const handleGetAccount = async () => {
    navigate("/getaccountdetails/" + id);
  };
  // const handleDelete = async () => {
  //   if (hadAcc) {
  //     await axios
  //       .delete("" + customer.id, {
  //         headers,
  //       })
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     alert("account deleted");
  //     sethadAcc(false);
  //     navigate("/navigateadmin");
  //   } else {
  //     alert("couldnot delete account");
  //   }
  // };
  return (
    <div>
      <ToastContainer />
      <button onClick={handleaddAccount}>Add Account</button>
      <button onClick={handleGetAccount}>Get Accounts details</button>
      {/* <button onClick={handleDelete}>Delete account</button>} */}
      {customer && <h1>Customer Details</h1>}

      {customer?.id && <div> Customer ID: {customer?.id} </div>}
      {customer?.name && <div> Customer Name: {customer?.name}</div>}
      {customer?.userName && (
        <div> Customer User Name: {customer?.userName} </div>
      )}
      {customer?.address && <div> Customer Address: {customer?.address} </div>}
      {customer?.city && <div> Customer City: {customer?.city} </div>}
      {customer?.email && <div> Email ID: {customer?.email} </div>}
      {customer?.contact && <div> Contact Number: {customer?.contact} </div>}

      <br />
      <buton
        type="submit"
        onClick={() => navigate(-1)}
        style={{ color: "blue", border: "10px" }}
      >
        Go Back
      </buton>
    </div>
  );
};
export default GetCustomer;
