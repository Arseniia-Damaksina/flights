import { useState } from 'react';
import axios from 'axios';
import { useActiveState } from '../ActiveStateContext';
import './Filterbar.css';

const Filterbar = ({ currentFilter, setCurrentFilter }) => {
    const { flights, setFlights } = useActiveState();

    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const lowerCaseDeparture = departure.toLowerCase();
        const lowerCaseArrival = arrival.toLowerCase();

        if (!lowerCaseDeparture && !lowerCaseArrival) {
            setError('Please fill in at least one input');
            return;
        }

        const formattedDeparture =
            lowerCaseDeparture.charAt(0).toUpperCase() +
            lowerCaseDeparture.slice(1);
        const formattedArrival =
            lowerCaseArrival.charAt(0).toUpperCase() +
            lowerCaseArrival.slice(1);

        try {
            const response = await axios.post(
                'http://localhost:5002/flights/filter',
                {
                    departure: formattedDeparture,
                    arrival: formattedArrival
                }
            );
            if (response.status !== 200) {
                throw new Error(
                    `Failed to fetch data with status: ${response.status}`
                );
            } else {
                setError('');
                setFlights(response.data.flights);
            }
        } catch (error) {
            setError('No flights found');
            console.error('Error submitting form:', error.message);
        }
    };

    const handleClose = async () => {
        setError('');
        setDeparture('');
        setArrival('');
        try {
            const res = await axios.get(`http://localhost:5002/`);

            if (res.status !== 200) {
                throw new Error(
                    `Failed to fetch data with status: ${res.status}`
                );
            } else {
                setFlights(res.data.flights);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleSelectChange = async (selectedOption) => {
        try {
            let res;

            const handleSort = async (priceOption) => {
                res = await axios.post(
                    'http://localhost:5002/flights/sort-by-price',
                    { price: priceOption },
                    { withCredentials: true }
                );
                setFlights(res.data.flights);
            };

            if (
                selectedOption === 'min' ||
                selectedOption === 'max' ||
                selectedOption === 'empty'
            ) {
                setError('');
                await handleSort(selectedOption);
            }

            if (res && res.status !== 200) {
                setError(res.data.message);
                throw new Error(
                    `Failed to fetch data with status: ${res.status}`
                );
            }
        } catch (error) {
            console.error('Error handling select change:', error.message);
        }
    };

    return (
        <div className="filterbar">
            <p>{error}</p>
            <div className="filterbar-items">
                <ul>
                    <li
                        style={{
                            textDecoration:
                                currentFilter === 'all' ? 'underline' : 'none'
                        }}
                        onClick={() => setCurrentFilter('all')}
                    >
                        All Flights
                    </li>
                    <li
                        style={{
                            textDecoration:
                                currentFilter === 'myFlights'
                                    ? 'underline'
                                    : 'none'
                        }}
                        onClick={() => setCurrentFilter('myFlights')}
                    >
                        My Flights
                    </li>
                    <li
                        style={{
                            textDecoration:
                                currentFilter === 'bookedFlights'
                                    ? 'underline'
                                    : 'none'
                        }}
                        onClick={() => setCurrentFilter('bookedFlights')}
                    >
                        Booked Flights
                    </li>
                </ul>

                <div className="form-select-container">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="depature">Departure: </label>
                        <input
                            type="text"
                            name="depature"
                            id="depature"
                            value={departure}
                            onChange={(e) => setDeparture(e.target.value)}
                        />
                        <label htmlFor="arrival">Arrival: </label>
                        <input
                            type="text"
                            name="arrival"
                            id="arrival"
                            value={arrival}
                            onChange={(e) => setArrival(e.target.value)}
                        />
                        <button type="submit">Send</button>
                    </form>
                    <div
                        className="closeButton"
                        style={
                            currentFilter === 'all'
                                ? { marginRight: '140px' }
                                : { marginRight: 0 }
                        }
                    >
                        <button onClick={handleClose}>Clear</button>
                    </div>
                    {currentFilter === 'all' ? (
                        <div className="select">
                            <label htmlFor="price">Price:</label>
                            <select
                                id="price"
                                name="price"
                                value={selectedOption}
                                onChange={(e) => {
                                    setSelectedOption(e.target.value);
                                    handleSelectChange(e.target.value);
                                }}
                            >
                                <option value="empty"></option>
                                <option value="min">Price min</option>
                                <option value="max">Price max</option>
                            </select>{' '}
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
};

export default Filterbar;
