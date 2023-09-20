import React, { useState, useContext } from 'react';
import axios from 'axios';
import {AppContext} from '../../Context/AppContext';

const TransferPage = () => {

    const [amount, setAmount] = useState(0);
    const {recipientAccount, setRecipientAccount} = useContext(AppContext);
    const {senderAccount, setSenderAccount}=useContext(AppContext);
    const [senderBal, setSenderBal] = useState(0);//Sender's balance
    const [recipientBal, setRecipientBal] = useState(0);//Recipient's balance
    const [Error, setError] = useState('');

    const handleAmount = (event) => {
        console.log(event.target.value);
        setAmount(event.target.value);
    }
    
    const handleRecipientAccount = (event) => {
        console.log(event.target.value);
        setRecipientAccount(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setSenderBal(senderAccount.Balance);
            setSenderBal(senderBal-amount);
            const sender = {...senderAccount, senderBal};
            setRecipientBal(recipientAccount.Balance+amount);
            const recipient = {...recipientAccount, recipientBal};
            setSenderAccount(sender);
            setRecipientAccount(recipient);
            console.log(sender);
            console.log(recipient);
            axios
                .post('https://localhost:7104/api/AtmUsers', sender, recipient)//change
                .then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        console.log(response);
                    }
                    else {
                        alert("Transfer failed");
                    }
                });
        }
        catch (error) {
            setError(error.Message);
        }
    }
    return (
        <div>
            <h1>Transfer Money</h1>
            <div>
                Account No.:{senderAccount.AccountI}
            </div> 
            <div>
                Balance:{senderAccount.Balance}
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    Enter the recipient's account no.: <input type="text" value={recipientAccount.AccountID} onChange={handleRecipientAccount}   required/>
                </div>
                <div>
                    Enter the amount to be transferred: <input type="number" min="100" max={senderAccount.Balance} value={amount} onChange={handleAmount}  required/>
                </div>
               
                <br/>
                <div>
                    <button type="submit"> Transfer </button>
                </div>
               
            </form>
        </div>
    );
}

export default TransferPage;