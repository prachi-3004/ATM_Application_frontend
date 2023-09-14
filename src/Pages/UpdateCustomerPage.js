import React,{useState,useContext} from 'react';
import {AppContext} from '../Context/AppContext';
import axios from 'axios';
const UpdateCustomerPage = () =>{
    const[customer,setCustomer]=useState(null);
    const[custId,setcustId]=useState('');
    const{user,setUser}=useContext(AppContext);
    const[token,setToken]=useState('');
    const handlecustId = (event) =>{
        setcustId(event.target.value);
    }
    const handleGet=()=>{
        setToken(user.token);
        const headers={"Authorization":`Bearer${user.token}`};
        console.log(headers)
        console.log(custId);
        axios.get('https://localhost:7104/api/updatecustomer/'+custId,{headers}).then(response=>setCustomer(response.data));
        console.log(customer);
    }
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setCustomer(prev => ({...prev,[name]:value}));
    }
    const handleUpdate = async () =>{
        //setCustomer(prev => ({...prev,UserName:customer.UserName,UserAddress:customer.UserAddress,City:customer.City,Email:customer.Email,Contact:customer.Contact,Password:customer.Password}));
        const response = await axios.put('',customer);
        setCustomer(response.data);
        console.log(response.data);
    }
    return(
        <div>
         <h4>Update Customer details</h4>
                <div>  
                <label>Customer ID  </label>
                <input type="number" value={custId} placeholder="Enter customer ID" onChange={handlecustId} required/>
                </div>
                <br/>
                <button onClick={handleGet}>Get Details</button>
                {customer && <h1>Customer Details</h1>}
                {customer && <div>
                    Name: <input type="text" value={customer.UserName} onChange={handleChange} required />
                </div>}
                {customer && <div>
                    Address: <input type="text" value={customer.UserAddress} onChange={handleChange} required/>
                </div>}
                {customer && <div>
                    City: <input type="text" value={customer.City} onChange={handleChange}/>
                </div>}
                {customer && <div>
                    Email: <input type="text" value={customer.Email} onChange={handleChange} required/>
                </div>}
                {customer && <div>
                    Contact: <input type="text" pattern="[0-9]{10}" value={customer.Contact} onChange={handleChange} required />
                </div>}
                {customer && <div>
                    Password: <input type="password" value={customer.Password} onChange={handleChange} required/>
                </div>}
                {customer && <button type="submit" onClick={handleUpdate}>Update</button>}
                
        </div>
    );
}
export default UpdateCustomerPage;