//get customer page
import React, { useState, useContext, useEffect } from "react";
import { getcustomer } from "../Routes";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const GetCustomer = () => {
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login"))
  );
  const [userType, setuserType] = useState(
    JSON.parse(window.localStorage.getItem("role"))
  );
  const { id } = useParams();
  const navigate = useNavigate();
  var res = {};
  const { user, setUser } = useContext(AppContext);
  const [customer, setCustomer] = useState({});
  const headers = { Authorization: `Bearer ${token}` };

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
        toast.error(err.Message);
      });
  };

  useEffect(() => {
    getcust();
  }, [id]);
  const handleaddAccount = async () => {
    navigate("/createaccount/" + id);
  };
  const handleGetAccount = async () => {
    if (userType === 1) navigate("/getaccountdetails/" + id);
    else navigate("/getaccbyid/" + id);
  };
  //   const handleDelete = async (idx) => {
  //     if (hadAcc) {
  //       await axios
  //         .delete(deleteaccount + idx, {
  //           headers,
  //         })
  //         .then((res) => {
  //           if(res.status>=200 && res.status<300){
  //             toast.success("Account disabled succesfully!");
  //           }
  //           else{
  //             toast.error("Deletion failed");
  //           }
  //         })
  //         .catch((err) => {
  //           if(err.response && err.response===500){
  //             toast.error(err.response.data);
  //           }
  //         else{
  //           toast.err(err.Message);
  //         }
  //         });

  //       navigate("/navigateadmin");
  //     } else {
  //       alert("couldnot delete account");
  //     }
  //   };
  return (
    <div>
      <ToastContainer />
      <button onClick={handleaddAccount}>Add Account</button>
      <button onClick={handleGetAccount}>Get Accounts details</button>

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
        onClick={() => navigate("/navigateadmin")}
        style={{ color: "blue", border: "10px" }}
      >
        Go Back
      </buton>
    </div>
  );
};
export default GetCustomer;
