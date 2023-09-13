import React, { useState, useContext } from 'react';
import axios from 'axios';
import validator from 'validator'
import {AppContext} from '../Context/AppContext';
const AddCustomerPage = () => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [Error, setError] = useState('');
    const[user,setUser]=useContext(AppContext);
    const[token,setToken]=useState(');')

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleAddress = (event) => {
        setAddress(event.target.value);
    }

    const handleCity = (event) => {
        setCity(event.target.value);
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleContact = (event) => {
        setContact(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (name.trim() == "") {
                alert('Name cannot be empty')
                return;
            }
            if (address.trim() == "") {
                alert('Address cannot be empty')
                return;
            }
            if (city.trim() == "") {
                alert('City cannot be empty')
                return;
            }
            if (contact.trim() == "") {
                alert('Contact cannot be empty')
                return;
            }
            if (!validator.isEmail(email)) {
                alert('Enter a valid email address');
                return;
            }
            else {
                const res = {
                    username: name,
                    useraddress: address,
                    city: city,
                    email: email,
                    contact: contact
                };
                setToken(user.token);
                const headers={"Authorization":`Bearer${user.token}`};
                console.log(headers);
                axios
                    .post('https://localhost:7104/api/AtmUsers', res, {headers})
                    //.get('./data.json')
                    .then((response) => {
                        if (response.status >= 200 && response.status < 300) {
                            console.log(response);
                            alert(`User registered successfully`);
                            setName('');
                            setAddress('');
                            setCity('');
                            setEmail('');
                            setContact('');
                        }
                        else {
                            alert("Registration failed");
                        }
                    });
            }
        }
        catch (error) {
            setError(error.Message);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    Name: <input type="text" value={name} onChange={handleName} />
                </div>
                <div>
                    Address: <input type="text" value={address} onChange={handleAddress} />
                </div>
                <div>
                    City: <input type="text" value={city} onChange={handleCity} />
                </div>
                <div>
                    Email: <input type="text" value={email} onChange={handleEmail} />
                </div>
                <div>
                    Contact: <input type="text" pattern="[0-9]{10}" value={contact} onChange={handleContact} />
                </div>
                <div>
                    <button type="submit"> Submit </button>
                </div>
            </form>
        </div>
    );
}

export default AddCustomerPage;