import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';

const WithdrawalPage = () => {

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
            setBalance(balance-amount);
            const res = {...account, balance};
            console.log(res);
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
             <h1>Withdrawal</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    Account No.:<input type="text" value={account.AccountID} readOnly />
                </div> 
                <div>
                    Balance: <input type="text" value={account.Balance} readOnly/>
                </div>

                <div>
                    Enter the amount to withdraw: <input type="number" min="100" max={account.Balance} value={amount} onChange={handleAmount}  required/>
                </div>
               
                <br/>
                <div>
                    <button type="submit"> Withdraw </button>
                </div>
               
            </form>
        </div>
    );
}

export default WithdrawalPage;