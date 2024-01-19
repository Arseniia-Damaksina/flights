import './Flight.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useActiveState } from '../ActiveStateContext';
import getCookieValue from '../utils/getCookieValue.js';
import decodeURI from '../utils/decodeURI.js';
import formatDateString from '../utils/formatDateString';

const Flight = ({ flight, onDelete, currentFilter }) => {
    const {
        loginActive,
        setLoginActive,
        registerActive,
        setRegisterActive,
        addFlightActive,
        setAddFlightActive,
        editFlightActive,
        setEditFlightActive,
        flightToUpdate,
        setFlightToUpdate,
        flights,
        setFlights
    } = useActiveState();

    const addToBooked = async (flight) => {
        try {
            const user_id_to_decode = getCookieValue('id');
            let user_id;
            if (user_id_to_decode) {
                user_id = decodeURI(user_id_to_decode);
            }

            const data = { flight };
            console.log(data);

            const res = await axios.post(
                `http://localhost:5002/add-to-booked/${user_id}`,
                data,
                {
                    withCredentials: true
                }
            );
            if (res.status !== 201) {
                throw new Error(
                    `Failed to fetch data with status: ${res.status}`
                );
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const removeFromBooked = async (flightToDelete) => {
        try {
            const user_id_to_decode = getCookieValue('id');
            let user_id;
            if (user_id_to_decode) {
                user_id = decodeURI(user_id_to_decode);
            }

            const res = await axios.delete(
                `http://localhost:5002/delete-from-booked/${user_id}/${flight._id}`,
                {
                    withCredentials: true
                }
            );
            if (res.status !== 200) {
                throw new Error(
                    `Failed to fetch data with status: ${res.status}`
                );
            } else {
                setFlights(
                    flights.filter(
                        (flightItem) => flightItem._id !== flightToDelete._id
                    )
                );
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="flight">
            <div className="departure">
                <h2>{flight.departure_city}</h2>
                <h4>{flight.departure_airport}</h4>
                <h3>{formatDateString(flight.departure_time)}</h3>
            </div>
            <div className="duration">
                <div className="line-with-circles">
                    <div className="circle"></div>
                    <div className="circle right"></div>
                </div>
                <h4>{flight.duration}</h4>
            </div>
            <div className="arrival">
                <h2>{flight.arrival_city}</h2>
                <h4>{flight.arrival_airport}</h4>
                <h3>{formatDateString(flight.arrival_time)}</h3>
            </div>
            <div className="airlines">
                <h3>{flight.airline}</h3>
            </div>
            <div className="flightNumber">
                <h3>{flight.flight_number}</h3>
            </div>
            <div className="price">
                <h3>{flight.price}$</h3>
            </div>
            {currentFilter === 'myFlights' ? (
                <div className="icons">
                    <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{
                            color: '#b61515',
                            fontSize: '20px',
                            margin: '10px 5px'
                        }}
                        onClick={() => {
                            setFlightToUpdate(flight);
                            setEditFlightActive(!editFlightActive);
                            setAddFlightActive(editFlightActive);
                            setLoginActive(false);
                            setRegisterActive(false);
                        }}
                    />
                    <FontAwesomeIcon
                        icon={faTrash}
                        style={{
                            color: '#b61515',
                            fontSize: '20px',
                            margin: '10px 5px'
                        }}
                        onClick={onDelete}
                    />
                </div>
            ) : (
                ''
            )}
            <div className="bookButton">
                {currentFilter === 'bookedFlights' ? (
                    <button onClick={() => removeFromBooked(flight)}>
                        Unbook
                    </button>
                ) : (
                    <button onClick={() => addToBooked(flight)}>Book</button>
                )}
            </div>
        </div>
    );
};

export default Flight;
