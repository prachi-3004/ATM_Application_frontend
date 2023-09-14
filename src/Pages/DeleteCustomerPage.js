import React,{useState, useContext} from 'react';
import axios from 'axios';
import { AppContext } from '../Context/AppContext';
const DeleteCustomerPage = () =>{
    const[customer,setCustomer]=useState(null);
    const[custId,setcustId]=useState('');
    const{user,setUser}=useContext(AppContext);
    const[token,setToken]=useState('');
    const handlecustId = (event) =>{
        setcustId(event.target.value);
    }
    const handleSubmit = async ()=>{
        setToken(user.token);
        const headers={"Authorization":`Bearer${user.token}`};
        console.log(headers)
        console.log(custId);
        await axios.delete('https://localhost:7104/api/deletecustomer/'+custId,{headers}).then(response=>setCustomer(response.data));
        console.log("User deleted successfully!");
    }
    return(
            <div>
                <h4>Delete Customer</h4>
                <div>  
                <label>Customer ID  </label>
                <input type="number" value={custId} placeholder="Enter customer ID" onChange={handlecustId} required/>
                </div>
                <br/>
                <button onClick={handleSubmit}>Delete</button>
               
            </div>
    );
}
export default DeleteCustomerPage;