import './LoginForm.css';

import { useState } from 'react';
import axios from 'axios';
import { useActiveState } from '../ActiveStateContext';

import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
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
        const emailIsValid = validateEmail(email);
        const passwordIsValid = validatePassword(password);
        if (emailIsValid && passwordIsValid) {
            const data = {
                email: email,
                password: password
            };
            const postLogin = async () => {
                try {
                    const res = await axios.post(
                        'http://localhost:5002/login',
                        data,
                        {
                            withCredentials: true
                        }
                    );

                    if (res.status !== 200) {
                        throw new Error('Error while login');
                    } else {
                        if (res.data.success) {
                            console.log('Logged in');
                        }
                    }
                    setEmail('');
                    setPassword('');
                    setError('');
                    setLoginActive(false);
                    setAddFlightActive(true);
                } catch {
                    setError('Error while log in');
                }
            };
            postLogin();
        } else {
            setError('Email or password is not valid');
        }
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    return loginActive ? (
        <div className="form-component">
            <p>{error}</p>
            <div className="form-container">
                <h2>Login</h2>
                <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
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
                    <div className="buttonsDiv">
                        <button id="send" type="submit">Login</button>
                        <button id="close" onClick={() => {
                            setLoginActive(false);
                            setAddFlightActive(true);
                        }}>Close</button>
                    </div>
                </form>
                <p>Do not have an account?</p>
                <p>
                    Please,{' '}
                    <span
                        onClick={() => {
                            setLoginActive(false);
                            setRegisterActive(true);
                        }}
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    ) : (
        ''
    );
};

export default LoginForm;
