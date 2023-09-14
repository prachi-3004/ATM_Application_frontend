import React,{useState, useContext} from 'react';
import axios from 'axios';
import { AppContext } from '../Context/AppContext';
const GetCustomerById = () =>{
    const[customer,setCustomer]=useState(null);
    const[custId,setcustId]=useState('');
    const{user,setUser}=useContext(AppContext);
    const[token,setToken]=useState('');
    //const {user,setUser}=useContext(AppContext);
    const handlecustId = (event) =>{
        setcustId(event.target.value);
    }
    const handleSubmit=()=>{
        setToken(user.token);
        const headers={"Authorization":`Bearer${user.token}`};
        console.log(headers)
        console.log(custId);
        axios.get('https://localhost:7104/api/customer/getcustomer/'+custId,{headers}).then(response=>setCustomer(response.data));
    }
    return(
            <div>
                <h4>Get Customer details</h4>
                <div>  
                <label>Customer ID  </label>
                <input type="number" value={custId} placeholder="Enter customer ID" onChange={handlecustId} required/>
                </div>
                <br/>
                <button onClick={handleSubmit}>Get Details</button>
                {customer && <h1>Customer Details</h1>}

                {customer && <div> Customer Name: {customer?.UserName} </div>}
                {customer && <div> Customer Address: {customer?.UserAddress} </div>}
                {customer && <div> Customer City: {customer?.City} </div>}
                {customer && <div> Email ID: {customer?.Email} </div>}
                {customer && <div> Contact Number: {customer?.Contact} </div>}
            </div>
    );
}
export default GetCustomerById;