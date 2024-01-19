import { useState, useEffect } from 'react';
import axios from 'axios';
import './Flights.css';

import Flight from './Flight';
import { useActiveState } from '../ActiveStateContext';
import Filterbar from '../components/Filterbar';
import getCookieValue from '../utils/getCookieValue.js';
import decodeURI from '../utils/decodeURI.js';

const Flights = () => {
    const { flights, setFlights } = useActiveState();
    const [currentFilter, setCurrentFilter] = useState('all');

    useEffect(() => {
        const getFlights = async () => {
            try {
                const user_id_to_decode = getCookieValue('id');
                let user_id;
                if (user_id_to_decode) {
                    user_id = decodeURI(user_id_to_decode);
                }
                let res;
                if (currentFilter === 'all') {
                    res = await axios.get(`http://localhost:5002/`);
                    setFlights(res.data.flights);
                }
                else if (currentFilter === 'myFlights') {
                    res = await axios.get(`http://localhost:5002/flights-by-user/${user_id}`, {
                        withCredentials: true
                    });
                    setFlights(res.data.flights);
                }
                else if (currentFilter === 'bookedFlights') {
                    res = await axios.get(`http://localhost:5002/get-booked/${user_id}`, {
                        withCredentials: true
                    });
                    setFlights(res.data.flights);
                }

                if (res.status !== 200) {
                    throw new Error(
                        `Failed to fetch data with status: ${res.status}`
                    );
                }
            } catch (err) {
                console.log(err);
            }
        };

        getFlights();
    }, [currentFilter]);

    const handleDelete = async (flightId, userId) => {
        try {
            const currentId = decodeURI(getCookieValue('id'));
            if (currentId === userId) {
                const res = await axios.delete(
                    `http://localhost:5002/delete/${flightId}`,
                    {
                        withCredentials: true
                    }
                );
                if (res.status === 200) {
                    setFlights(
                        flights.filter((flight) => flight._id !== flightId)
                    );
                } else {
                    throw new Error(
                        `Failed to delete product with status: ${res.status}`
                    );
                }
            } else {
                throw new Error(`You are not authorised to delete this book!`);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className="flightsContainer">
            <Filterbar
                currentFilter={currentFilter}
                setCurrentFilter={setCurrentFilter}
            />
            <div className="flights">
                {flights && flights.length ? (
                    flights.map((flight) => (
                        <Flight
                            key={flight._id}
                            flight={flight}
                            flights={flights}
                            setFlights={setFlights}
                            currentFilter={currentFilter}
                            onDelete={() =>
                                handleDelete(flight._id, flight.user_id)
                            }
                        />
                    ))
                ) : (
                    <p>No flights found</p>
                )}
            </div>
        </div>
    );
};

export default Flights;
