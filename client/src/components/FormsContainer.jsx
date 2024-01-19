import { useState } from 'react';
import './FormsContainer.css';

import Navbar from './Navbar';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import AddFlightForm from './AddFlightForm';
import EditFlightForm from './EditFlightForm';

const FormsContainer = () => {
    return (
        <div className="formsContainer">
            <div className="backgroundContainer">
                <Navbar />
                <LoginForm />
                <RegisterForm />
                <AddFlightForm />
                <EditFlightForm />
            </div>
        </div>
    );
};

export default FormsContainer;
