import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';

const BalanceCheckPage = () => {

    const [Error, setError] = useState('');
    const {account, setAccount}=useContext(AppContext);


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
                        alert("Withdrawal failed");
                    }
                });
        }
        catch (error) {
            setError(error.Message);
        }
    }
    return (
        <div>
             <h1>Balance Inquiry</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    Account No.:<input type="text" value={account.AccountID} readOnly />
                </div> 
                <div>
                    Balance: <input type="text" value={account.Balance} readOnly/>
                </div>
                <br/>
                <div>
                    <button type="submit"> Go back </button>
                </div>
               
            </form>
        </div>
    );
}

export default BalanceCheckPage;