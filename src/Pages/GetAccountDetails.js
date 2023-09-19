import React,{useState} from React;

const GetAccountDetails = ()=>{
  // [custId,setcustId]=useState(null);
  const [account,setAccount]=useState(null);
  return(
<div>
<h3>Account Details</h3>
<div>
    {account && <div> Account ID: {account?.ID} </div>}
    {account && <div> Account Type: {account?.Type} </div>}
    {account && <div> Date of Creation: {account?.DateOfCreation} </div>}
    {account && <div> Card Number: {account?.CardNumber} </div>}
    {account && <div> Balance: {account?.Balance} </div>}


    </div>
    <div>
        {!account && <div>Unable to fetch account details</div>}
    </div>
</div>
    );
}
export default GetAccountDetails;