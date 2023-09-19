import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';

const MiniStatementsPage = () => {

    const [Error, setError] = useState('');
    const {account, setAccount}=useContext(AppContext);


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            axios
                .post('https://localhost:7104/transactions',account)//check if correct
                .then(() => {
                    console.log("redirected from mini statements");
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

export default MiniStatementsPage;