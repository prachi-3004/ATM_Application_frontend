import React, { useState, useContext } from 'react';
import axios from 'axios';
//import {AppContext} from '../Context/AppContext';

const TransactionsPage = () => {

    const [transactionType, setTransactionType] = useState('');
    const [Error, setError] = useState('');

    const handleTransactionType = (event) => {
        console.log(event.target.value);
        setTransactionType(event.target.value);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
                const res = {
                    transactiontype: transactionType,
                };
                console.log(res);
                /*axios
                    .post('https://localhost:7104/api/AtmUsers', res)//change
                    //.get('./data.json')
                    .then((response) => {
                    });
                    */
        }
        catch (error) {
            setError(error.Message);
        }
    }
    return (
        <div>
            <h1>Please choose the type of transaction:</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <button type="submit" value="Withdrawal" onClick={handleTransactionType}> Withdrawal </button>
                </div>
                <div>
                    <button type="submit" value="Deposit" onClick={handleTransactionType}> Deposit </button>
                </div>
                <div>
                    <button type="submit" value="Transfer" onClick={handleTransactionType}> Transfer </button>
                </div>
            </form>
        </div>
    );
}

export default TransactionsPage;