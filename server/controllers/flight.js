import Flight from '../models/flight.js';
import User from '../models/user.js';

const flightControllers = {
    getFlights: async (req, res) => {
        try {
            const result = await Flight.find();
            if (result.length > 0) {
                res.status(200).json({ success: true, flights: result });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'No flights found'
                });
            }
        } catch (err) {
            res.status(500).json({ success: false, err: err.message });
        }
    },
    getFlight: async (req, res) => {
        try {
            const { flight_id } = req.params;

            const result = await Flight.findOne({ _id: flight_id });

            if (result) {
                res.status(200).json({ success: true, flight: result });
            } else {
                res.status(404).json({
                    success: false,
                    error: 'Flight not found'
                });
            }
        } catch (err) {
            res.status(500).json({ success: false, err: err.message });
        }
    },
    getFlightsByUser: async (req, res) => {
        try {
            const { user_id } = req.params;

            const result = await Flight.find({ user_id });
            if (result.length > 0) {
                res.status(200).json({ success: true, flights: result });
            } else {
                res.status(404).json({
                    success: false,
                    error: 'Flights not found'
                });
            }
        } catch (err) {
            res.status(500).json({ success: false, err: err.message });
        }
    },
    addFlight: async (req, res) => {
        try {
            const {
                flight_number,
                airline,
                departure_city,
                departure_airport,
                arrival_city,
                arrival_airport,
                departure_time,
                arrival_time,
                duration,
                price
            } = req.body;
            const { user_id } = req.params;

            if (
                !flight_number ||
                !airline ||
                !departure_city ||
                !departure_airport ||
                !arrival_city ||
                !arrival_airport ||
                !departure_city ||
                !departure_airport ||
                !departure_time ||
                !arrival_time ||
                !duration ||
                !price
            ) {
                return res.status(400).json({
                    success: false,
                    err: 'Please add the required data'
                });
            }

            const result = await Flight.create({
                flight_number,
                airline,
                departure_city,
                departure_airport,
                arrival_city,
                arrival_airport,
                departure_time,
                arrival_time,
                duration,
                price: parseInt(price),
                user_id
            });
            return res.status(201).json({
                success: true,
                flight: result,
                message: 'The flight is added successfully!'
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                err: err.message || 'Error while adding a flight'
            });
        }
    },
    addToBooked: async (req, res) => {
        try {
            const { user_id } = req.params;
            const { flight } = req.body;

            const user = await User.findById(user_id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            user.bookedFlights.push(flight);
            await user.save();

            return res.status(201).json({
                success: true,
                message: 'The flight is booked successfully!',
                user
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({
                success: false,
                err: err.message || 'Error while booking a flight'
            });
        }
    },
    deleteFromBooked: async (req, res) => {
        try {
            const { user_id, flight_id } = req.params;

            const user = await User.findById(user_id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            const isFlightBooked = user.bookedFlights.some((bookedFlight) =>
                bookedFlight.equals(flight_id)
            );
            if (isFlightBooked) {
                user.bookedFlights.pull(flight_id);
                await user.save();

                return res.status(200).json({
                    success: true,
                    message: 'The flight is removed from booked successfully!',
                    user
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'The specified flight is not booked by the user'
                });
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).json({
                success: false,
                err: err.message || 'Error while removing a flight from booked'
            });
        }
    },
    getBooked: async (req, res) => {
        try {
            const { user_id } = req.params;
            console.log(user_id)

            const result = await User.find({ _id: user_id });
            
            if (result) {
                const bookedFlights = result[0].bookedFlights;
                res.status(200).json({ success: true, flights: bookedFlights });
            } else {
                res.status(404).json({
                    success: false,
                    error: 'Flights not found',
                    flights: []
                });
            }
        } catch (err) {
            res.status(500).json({ success: false, err: err.message });
        }
    },
    updateFlight: async (req, res) => {
        try {
            const { flight_id } = req.params;
            const {
                flight_number,
                airline,
                departure_city,
                departure_airport,
                arrival_city,
                arrival_airport,
                departure_time,
                arrival_time,
                duration,
                price
            } = req.body;
            if (
                !flight_number ||
                !airline ||
                !departure_city ||
                !departure_airport ||
                !arrival_city ||
                !arrival_airport ||
                !departure_city ||
                !departure_airport ||
                !departure_time ||
                !arrival_time ||
                !duration ||
                !price
            ) {
                return res.status(400).json({
                    success: false,
                    err: 'Please fill in all the fields'
                });
            }

            const result = await Flight.updateOne(
                { _id: flight_id },
                {
                    flight_number,
                    airline,
                    departure_city,
                    departure_airport,
                    arrival_city,
                    arrival_airport,
                    departure_time,
                    arrival_time,
                    duration,
                    price
                }
            );
            if (result.modifiedCount > 0) {
                return res.status(200).json({
                    success: true,
                    message: 'Flight is updated successfully'
                });
            } else {
                return res.status(404).json({
                    success: false,
                    error: 'Flight not found for update'
                });
            }
        } catch (err) {
            res.status(500).json({ success: false, err: err.message });
        }
    },
    deleteFlight: async (req, res) => {
        try {
            const { flight_id } = req.params;

            const result = await Flight.deleteOne({ _id: flight_id });

            if (result.deletedCount > 0) {
                return res.status(200).json({
                    success: true,
                    message: 'Flight is deleted successfully'
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'Flight is not found to delete'
                });
            }
        } catch (err) {
            res.status(500).json({ success: false, err: err.message });
        }
    },
    filterFlights: async (req, res) => {
        try {
          const { departure, arrival } = req.body;
      
          const query = {};
          if (departure) {
            query.departure_city = { $regex: new RegExp(departure, 'i') };
          }
          if (arrival) {
            query.arrival_city = { $regex: new RegExp(arrival, 'i') };
          }
      
          const result = await Flight.find(query);
      
          if (result.length > 0) {
            res.status(200).json({ success: true, flights: result });
          } else {
            res.status(404).json({
              success: false,
              message: 'No flights found based on the provided filters'
            });
          }
        } catch (err) {
          res.status(500).json({ success: false, err: err.message });
        }
      },      
    sortFlightsByPrice: async (req, res) => {
        try {
            const { price } = req.body;

            let sortDirection;

            if (price === 'min') {
                sortDirection = 1;
            } else if (price === 'max') {
                sortDirection = -1;
            } else if (price === 'empty') {
                const result = await Flight.find();

                if (result.length > 0) {
                    return res
                        .status(200)
                        .json({ success: true, flights: result });
                } else {
                    return res.status(404).json({
                        success: false,
                        message:
                            'No flights found based on the provided filters'
                    });
                }
            }

            const result = await Flight.find().sort({ price: sortDirection });

            if (result.length > 0) {
                return res.status(200).json({ success: true, flights: result });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'No flights found based on the provided filters'
                });
            }
        } catch (err) {
            return res.status(500).json({ success: false, err: err.message });
        }
    }
};

export default flightControllers;
