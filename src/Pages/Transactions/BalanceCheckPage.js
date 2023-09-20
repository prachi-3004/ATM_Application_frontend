import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';

const BalanceCheckPage = () => {

    const [Error, setError] = useState('');
    const {account, setAccount}=useContext(AppContext);


    const handleRedirect = async (event) => {
        event.preventDefault();
        try {
            axios
                .post('https://localhost:7104/api/AtmUsers', res)//change
                .then((response) => {
                    console.log("redirect worked properly");
                });
        }
        catch (error) {
            setError(error.Message);
        }
    }
    return (
        <div>
            <h1>Balance Inquiry</h1>
            <div>
                Account No.:{account.AccountID}
            </div> 
            <div>
                Balance:{account.Balance}
            </div>
            <br/>
            <div>
                <button type="submit" onClick={handleRedirect}> Go back </button>
            </div>
        </div>
    );
}

export default BalanceCheckPage;