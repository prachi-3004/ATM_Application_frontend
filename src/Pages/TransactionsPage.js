import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import {useNavigate, useParams } from 'react-router';
import { AppContext } from '../Context/AppContext';

const TransactionsPage = () => {

    const { user, setUser } = useContext(AppContext);
    const [account, setAccount]=useState([]);
    const [token, setToken] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [Error, setError] = useState('');
    let id=3002;
    const navigate =useNavigate();
    var res={};

    useEffect(() => {
        setToken(user.token);
    }, [user.token]
    );
    if(user.token == null) navigate('/');
    const headers = { Authorization: `Bearer${user.token}` };

    useEffect(() => {
        getAccount();
      }, [id]);
     // console.log(id);
    
    const getAccount = async() => {
        res = await axios.get("https://localhost:44307/api/Account/GetAccountByID/"+id, {
            headers,
        });
        console.log("resdata"+res.data);
        setAccount(res.data);
    };

    const handleWithdrawal = () => {
        navigate('withdrawal/'+id);
    }
    const handleDeposit = () => {
        navigate('deposit/'+id);
    }
    const handleTransfer = () => {
        navigate('transfer/'+id);
    }
    const handleBalanceCheck = () => {
        navigate('balancecheck/'+id);
    }
    const handleMiniStatements = () => {
        navigate('ministatements/'+id);
    }
    const handleChangePin= () => {
        navigate('changepin/'+id);
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
                    <button type="submit" value="Withdrawal" onClick={handleWithdrawal}> Withdrawal </button>
                </div>
                <div>
                    <button type="submit" value="Deposit" onClick={handleDeposit}> Deposit </button>
                </div>
                <div>
                    <button type="submit" value="Transfer" onClick={handleTransfer}> Transfer </button>
                </div>
                <div>
                    <button type="submit" value="BalanceCheck" onClick={handleBalanceCheck}> Balance Check </button>
                </div>
                <div>
                    <button type="submit" value="MiniStatements" onClick={handleMiniStatements}> Mini Statements</button>
                </div>
                <div>
                    <button type="submit" value="ChangePin" onClick={handleChangePin}> Change Pin</button>
                </div>
            </form>
        </div>
    );
}

export default TransactionsPage;