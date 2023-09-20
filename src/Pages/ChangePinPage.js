import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';

const ChangePinPage = () => {

    const {account, setAccount}=useContext(AppContext);
    const [oldpassword, setOldPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const handleOldPassword = (event) => {
        console.log(event.target.value);
        setOldPassword(event.target.value);
    }

    const handleNewPassword = (event) => {
        console.log(event.target.value);
        setNewPassword(event.target.value);
    }

    const handleConfirmPassword = (event) => {
        console.log(event.target.value);
        setConfirmPassword(event.target.value);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            axios
                .post('https://localhost:7104/api/AtmUsers', res)//change
                .then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        console.log(response);
                    }
                    else {
                        alert("Pin change failed");
                    }
                });
        }
        catch (error) {
            setError(error.Message);
        }
    }
    return (
        <div>
             <h1>Change your ATM pin</h1>
            <form onSubmit={handleSubmit}>

                <div>
                    Enter current password: <input type="password" value={oldpassword} onChange={handleOldPassword}  required/>
                </div>
                <div>
                    Enter new password: <input type="password" value={newpassword} onChange={handleNewPassword}  required/>
                </div>
                <div>
                    Confirm your new password: <input type="password" value={confirmpassword} onChange={handleConfirmPassword}  required/>
                </div>
                <br/>
                <div>
                    <button type="submit"> OK </button>
                </div>
               
            </form>
        </div>
    );
}

export default ChangePinPage;