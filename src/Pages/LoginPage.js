import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
   // const [loginobj, setLoginObj] = useState({ username: '', password: '' });//change
    const [username, setUsername] = useState('');
    const [password, setpwd] = useState('');
    const [login, setLogin] = useState(false);
    //const [storage, setStorage] = useState('');
    //const [Error, setError] = useState({name:'',pwd:''});
    const { user, setUser } = useContext(AppContext);

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
            password:password
        };
        event.preventDefault();
        try {
                console.log(res);
                const response = await axios.post('https://localhost:44306/api/Authorization',res);
                if(response.status >= 200 && response.status < 300){
                    console.log(response.data);
                    setLogin(true);   
                    setUser(response.data);
                    //console.log(login);
                    //console.log("User details "+user);               
                    if (response.data.role==0) {
                       navigate('/navigateadmin');
                    }
                    if(response.data.role==1){
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
        </div>
    );
}

export default LoginPage;