import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setpwd] = useState('');
    const [login, setLogin] = useState(false);
    const { user, setUser } = useContext(AppContext);
    const [userType,setuserType]=useState('Customer');
    const navigate = useNavigate();
    const handleUsername = (event) => {
        setUsername(event.target.value);
    }
    const handlepwd = (event) => {
        setpwd(event.target.value);
    }
    const handleSubmit = async (event) => {
        const res = {
            username: username,
            password:password,
            role:userType
        };
        event.preventDefault();
        try {
                console.log(res);
                const response = await axios.post('https://localhost:44306/api/Authorization',res);
                if(response.status >= 200 && response.status < 300){
                    console.log(response.data);
                    setLogin(true);   
                    setUser(response.data);
                                   
                    if (res.role=='Admin') {
                       navigate('/navigateadmin');
                    }
                    if(res.role=='Customer'){
                        navigate('/navigatecustomer');
                    }
                }           
            }  
        catch (error)
        {
            console.log(error);
        }

    }
    return (
        <div>
            <h1>Login to ATM Banking</h1>
            <form style={{align:'center'}} className="loginform" onSubmit={handleSubmit}>
                <div>
                    Login as: 
                    <label><input type="radio" value="Customer" checked={userType==='Customer'} onChange={()=> setuserType('Customer')}/>Customer</label>
                    <label><input type="radio" value="Admin" checked={userType==='Admin'} onChange={()=> setuserType('Admin')}/>Admin</label>
                </div>
                <br/>
                <div>
                    Username: <input type="text" placeholder="Enter User Name" value={username} onChange={handleUsername}  required/>
                </div>
               
                <br/>
                <div>
                    Password: <input type="password" placeholder="Enter Passworrd" value={password} onChange={handlepwd} required />
                </div> 
                
                <br/>
                <div>
                    <button type="submit"> Login </button>
                </div>
               
            </form>
            <br/>
            
        </div>
    );
}

export default LoginPage;