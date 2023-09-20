import React, { useState, useContext } from 'react';
import axios from 'axios';
import {AppContext} from '../../Context/AppContext';

const DepositPage = () => {

    const [amount, setAmount] = useState(0);
    const [Error, setError] = useState('');
    const {account, setAccount}=useContext(AppContext);
    const [balance, setBalance] = useState(0);

    const handleAmount = (event) => {
        console.log(event.target.value);
        setAmount(event.target.value);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setBalance(account.Balance);
            setBalance(balance+amount);
            const res = {...account, balance};
            console.log(res);
            axios
                .post('https://localhost:7104/api/AtmUsers', res)//change
                .then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        console.log(response);
                    }
                    else {
                        alert("Deposit failed");
                    }
                });
        }
        catch (error) {
            setError(error.Message);
        }
    }
    return (
        <div>
            <h1>Deposit</h1>
            <div>
                Account No.:{account.AccountID}
            </div> 
            <div>
                Balance:{account.Balance}
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    Enter the amount to deposit: <input type="number" min="500" value={amount} onChange={handleAmount}  required/>
                </div>
                <br/>
                <div>
                    <button type="submit"> Deposit </button>
                </div>
            </form>
            
        </div>
    );
}

export default DepositPage;