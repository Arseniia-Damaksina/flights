import axios from 'axios';
import { useState } from 'react';
import './AddFlightForm.css';
import { useActiveState } from '../ActiveStateContext';

import getCookieValue from '../utils/getCookieValue.js';
import decodeURI from '../utils/decodeURI.js';

const AddFlightForm = () => {
    const [flight_number, setFlight_number] = useState('');
    const [airline, setAirline] = useState('');
    const [departure_city, setDeparture_city] = useState('');
    const [departure_airport, setDeparture_airport] = useState('');
    const [departure_time, setDeparture_time] = useState('');
    const [arrival_city, setArrival_city] = useState('');
    const [arrival_airport, setArrival_airport] = useState('');
    const [arrival_time, setArrival_time] = useState('');
    const [duration, setDuration] = useState('');
    const [price, setPrice] = useState(0);
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

    const user_id_to_decode = getCookieValue('id');
    let user_id;
    if (user_id_to_decode) {
        user_id = decodeURI(user_id_to_decode);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            flight_number,
            airline,
            departure_city,
            departure_airport,
            departure_time,
            arrival_city,
            arrival_airport,
            arrival_time,
            duration,
            price
        };

        const postAddFlight = async () => {
            try {
                const res = await axios.post(
                    `http://localhost:5002/add/${user_id}`,
                    data,
                    {
                        withCredentials: true
                    }
                );
                console.log(res);
                if (res.status !== 201) {
                    throw new Error('Error while creating a new user');
                } else {
                    if (res.data.success) {
                        setMessage(res.data.message);
                        setError('')
                        window.location.reload();
                    }
                }
            } catch (err) {
                setError(err.message);
            }
        };

        postAddFlight();

        setFlight_number('');
        setAirline('');
        setDeparture_city('');
        setDeparture_airport('');
        setDeparture_time('');
        setArrival_city(''),
        setArrival_airport(''),
        setArrival_time(''),
        setDuration('');
        setPrice(0);
    };

    const handleFlightNumber = (e) => {
        setFlight_number(e.target.value);
    };

    const handleAirline = (e) => {
        setAirline(e.target.value);
    };

    const handleDepartureCity = (e) => {
        setDeparture_city(e.target.value);
    };

    const handleDepartureAirport = (e) => {
        setDeparture_airport(e.target.value);
    };

    const handleDepartureTime = (e) => {
        setDeparture_time(e.target.value);
    };

    const handleArrivalCity = (e) => {
        setArrival_city(e.target.value);
    };

    const handleArrivalAirport = (e) => {
        setArrival_airport(e.target.value);
    };

    const handleArrivalTime = (e) => {
        setArrival_time(e.target.value);
    };

    const handleDuration = (e) => {
        setDuration(e.target.value);
    };

    const handlePrice = (e) => {
        setPrice(e.target.value);
    };

    return (
        addFlightActive ? (<div className="add-form-component">
            <p>{error}</p>
            <p>{message}</p>
            <div className="add-form-container">
                <h2>Add your flight</h2>
                <form className="add-form" onSubmit={(e) => handleSubmit(e)}>
                    <div className="input-div">
                        <label htmlFor="flight_number">Flight Number: </label>
                        <input
                            type="text"
                            name="flight_number"
                            id="flight_number"
                            value={flight_number}
                            onChange={(e) => handleFlightNumber(e)}
                        />
                    </div>
                    <div className="input-div">
                        <label htmlFor="airline">Airline: </label>
                        <input
                            type="text"
                            name="airline"
                            id="airline"
                            value={airline}
                            onChange={(e) => handleAirline(e)}
                        />
                    </div>
                    <div className="input-div" id="durationDiv">
                        <label htmlFor="duration">
                            Duration:{' '}
                        </label>
                        <input
                            type="text"
                            name="duration"
                            id="duration"
                            value={duration}
                            onChange={(e) => handleDuration(e)}
                        />
                    </div>
                    <div className="input-div" id="priceDiv">
                        <label htmlFor="price">
                            Price:{' '}
                        </label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            value={price}
                            onChange={(e) => handlePrice(e)}
                        />
                    </div>
                    <div className="input-div">
                        <label htmlFor="departure_city">Departure City: </label>
                        <input
                            type="text"
                            name="departure_city"
                            id="departure_city"
                            value={departure_city}
                            onChange={(e) => handleDepartureCity(e)}
                        />
                    </div>
                    <div className="input-div">
                        <label htmlFor="departure_airport">
                            Departure Airport:{' '}
                        </label>
                        <input
                            type="text"
                            name="departure_airport"
                            id="departure_airport"
                            value={departure_airport}
                            onChange={(e) => handleDepartureAirport(e)}
                        />
                    </div>
                    <div className="input-div">
                        <label htmlFor="departure_time">Departure Time: </label>
                        <input
                            type="datetime-local"
                            name="departure_time"
                            id="departure_time"
                            value={departure_time}
                            onChange={(e) => handleDepartureTime(e)}
                        />
                    </div>
                    <div className="input-div">
                        <label htmlFor="arrival_city">Arrival City: </label>
                        <input
                            type="text"
                            name="arrival_city"
                            id="arrival_city"
                            value={arrival_city}
                            onChange={(e) => handleArrivalCity(e)}
                        />
                    </div>
                    <div className="input-div">
                        <label htmlFor="arrival_airport">
                            Arrival Airport:{' '}
                        </label>
                        <input
                            type="text"
                            name="arrival_airport"
                            id="arrival_airport"
                            value={arrival_airport}
                            onChange={(e) => handleArrivalAirport(e)}
                        />
                    </div>
                    <div className="input-div">
                        <label htmlFor="arrival_time">Arrival Time: </label>
                        <input
                            type="datetime-local"
                            name="arrival_time"
                            id="arrival_time"
                            value={arrival_time}
                            onChange={(e) => handleArrivalTime(e)}
                        />
                    </div>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>) : ''
    );
};

export default AddFlightForm;
