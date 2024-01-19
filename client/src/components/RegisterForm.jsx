import { useState, useEffect } from 'react';
import axios from 'axios';
import './RegisterForm.css';
import { useActiveState } from '../ActiveStateContext';

import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/matchPasswords.js';
import matchPasswords from '../utils/matchPasswords.js';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const {
        loginActive,
        setLoginActive,
        registerActive,
        setRegisterActive,
        addFlightActive,
        setAddFlightActive,
        editFlightActive,
        setEditFlightActive
      } = useActiveState();      

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValidEmail = validateEmail(email);
        const isValidPassword = validatePassword(password);
        const isMatch = matchPasswords(password, confirmPassword);
      
        if (isMatch && isValidEmail && isValidPassword) {
        } else {
            setError('Please, fill in all the fields correctly');
        }
        const data = {
            email: email,
            password: password,
            confirmPassword: confirmPassword
        };

        const postRegister = async () => {
            try {
                const res = await axios.post(
                    'http://localhost:5002/register',
                    data
                );
                if (res.status !== 201) {
                    throw new Error('Error while creating a new user');
                } else {
                    if (res.data.success) {
                        setMessage(
                            'The account is created successfully, please log in'
                        );
                    }
                }
            } catch (err) {
                setError(err.message);
            }
        };
        postRegister();
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
        setMessage('');
        setRegisterActive(false);
        setLoginActive(true);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    return (
         registerActive ? (
        <div className="form-component-reg">
            <p>{error}</p>
            <p>{message}</p>
            <div className="form-container-reg">
                <h2>Register</h2>
                <form className="register-form" onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => handleEmail(e)}
                    />
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => handlePassword(e)}
                    />
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => handleConfirmPassword(e)}
                    />
                     <div className="buttonsDiv">
                        <button id="send-reg" type="submit">Register</button>
                        <button id="close-reg" onClick={() => {
                            setRegisterActive(false);
                            setAddFlightActive(true);
                        }}>Close</button>
                    </div>
                </form>
            </div>
        </div>
        ) : ""
    );
};

export default RegisterForm;
