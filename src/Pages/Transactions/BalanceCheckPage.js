import React, { useState, useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';

const BalanceCheckPage = () => {

    const [Error, setError] = useState('');
    const {account, setAccount}=useContext(AppContext);
    const navigate = useNavigate();

    const handleRedirect = async (event) => {
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