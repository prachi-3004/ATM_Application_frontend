import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [loginobj, setLoginObj] = useState({ username: '', password: '' });//change
    const [username, setUsername] = useState('');
    const [password, setpwd] = useState('');
    const [login, setLogin] = useState('');
    const [storage, setStorage] = useState('');
    const [Error, setError] = useState(false);
    const { user, setUser } = useContext(AppContext);

    const navigate = useNavigate();
    const handleUsername = (event) => {
        setUsername(event.target.value);
    }


    const handlepwd = (event) => {
        setpwd(event.target.value);
    }

    
    const handleSubmit = async (event) => {
        loginobj.username = username;//change
        loginobj.password = password;//change
        event.preventDefault();
        try {

            const response = await axios
                .post('https://localhost:44361/api/Authorization',//chnage
                    loginobj
                    );
            setUser(response.data);
            console.log(response.data);
            
            localStorage.setItem('login',JSON.stringify({
                login:true,
                store:result.token
            }))
            this.setState({login:true})

            if (response.data.user_Id === 'admin') {
                navigate('/customer');
            }

        }
        catch (error) {
            setError(true);
        }



    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    Username: <input type="text" value={username} onChange={handleUsername} />
                </div>
                <div>
                    Password: <input type="password" value={password} onChange={handlepwd} />
                </div>
                <div>
                    <button type="submit"> Login </button>
                </div>
                {Error && <div>Invalid Details </div>}
            </form>
        </div>
    );
}

export default LoginPage;