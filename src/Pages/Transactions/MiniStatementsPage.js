import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';

const MiniStatementsPage = () => {

    const [data, setData] = useState('');
    const [Error, setError] = useState('');
    const {account, setAccount}=useContext(AppContext);

    useEffect(() => {
        axios.get('https://localhost:7104/transactions')
            .then(res => setData(res.data))
            .catch(Error => console.log(Error));
    }, [])

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
            <h1> Transactions Statement</h1>
            <div>
                Account No.:{account.AccountID}
            </div> 
            <table className = "mini statements table">
                <thead>
                    <tr>
                        <th>Date of transaction</th>
                        <th>Amount</th>
                        <th>Type of transaction</th>
                        <th>Transaction ID</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((transaction,index) => {
                            return <tr key ={index}>
                                <td>{transaction.DateOfTransaction}</td>
                                <td>{transaction.Amount}</td>
                                <td>{transaction.TransactionType}</td>
                                <td>{transaction.TransactionID}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default MiniStatementsPage;