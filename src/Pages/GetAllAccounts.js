import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AccountTable } from "../Components/AccountTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getallacc, getaccbyid } from "../Routes";
const GetAllAccounts = () => {
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("login"))
  );

  const navigate = useNavigate();
  var res = {};
  const [account, setAccount] = useState([]);
  const headers = { Authorization: `Bearer ${token}` };
  const getAccs = async () => {
    await axios
      .get(getallacc, {
        headers,
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data);
          setAccount(response.data);
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
    getAccs();
  }, []);

  const handleDelete = async (idx) => {
    await axios
      .delete("" + idx, {
        headers,
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log("Account deleted successfully!");
          toast.success("Account deleted successfully!");
        } else {
          toast.error(response.data);
        }
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };
  const handleView = async (idx) => {
    // await axios
    //   .get(getaccbyid + idx, {
    //     headers,
    //   })
    //   .then((response) => setAccount(response.data));
    // if (account != null) navigate("/getaccountspec/" + idx);
    // else {
    //   toast.error("Couldn't fetch account details");
    //   console.log("Couldn't fetch account details");
    //   navigate("/navigateadmin");
    // }
    navigate("/getaccountspec/" + idx);
  };
  return (
    <div>
      <ToastContainer />
      <AccountTable
        rows={account}
        deleteRow={handleDelete}
        viewRow={handleView}
      />
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
export default GetAllAccounts;
