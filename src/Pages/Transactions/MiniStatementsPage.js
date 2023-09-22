import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { AppContext } from '../../Context/AppContext';

const MiniStatementsPage = () => {

    const { user, setUser } = useContext(AppContext);
    const [transactions, setTransactions]=useState([]);
    const [token, setToken] = useState('');
    const [Error, setError] = useState('');
    const { id } = useParams();
    //let id=3002;
    const navigate = useNavigate();
    var res={};

    useEffect(() => {
        setToken(user.token);
    }, [user.token]
    );
    if(user.token == null) navigate('/');
    const headers = { Authorization: `Bearer${user.token}` };

    const getTransactions = async() => {
        res = await axios.get("https://localhost:44307/api/Transaction?id="+id, {
            headers,
        });
        console.log("resdata"+res.data);
        setTransactions(res.data);
    };

    useEffect(() => {
        getTransactions();
      }, [id]);
      
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            navigate('/transactions');
        }
        catch (error) {
            setError(error.Message);
        }
    }
    return (
        <div>
            <h1> Transactions Statement</h1>
            
            <table className = "mini statements table">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Date of transaction</th>
                        <th>Amount</th>
                        <th>Type of transaction</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.map((transaction,index) => {
                            return <tr key ={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.time}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.type}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <div>
                <button type="submit" onClick={handleSubmit}> Go back </button>
            </div>
        </div>
    );
}

export default MiniStatementsPage;