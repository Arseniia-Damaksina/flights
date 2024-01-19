import express from 'express';

const router = express.Router();

import flightControllers from '../controllers/flight.js';
import verifyToken from '../middleware/verifyToken.js';

// routes
router.get("/", flightControllers.getFlights);
router.get("/flights/:flight_id", flightControllers.getFlight);
router.get("/flights-by-user/:user_id", flightControllers.getFlightsByUser);
router.post("/add/:user_id", verifyToken, flightControllers.addFlight);
router.put("/update/:flight_id", verifyToken, flightControllers.updateFlight);
router.delete("/delete/:flight_id", verifyToken, flightControllers.deleteFlight);
router.post("/add-to-booked/:user_id", verifyToken, flightControllers.addToBooked);
router.get("/get-booked/:user_id",verifyToken, flightControllers.getBooked);
router.delete("/delete-from-booked/:user_id/:flight_id", verifyToken, flightControllers.deleteFromBooked);
router.post("/flights/filter", flightControllers.filterFlights);
router.post("/flights/sort-by-price", flightControllers.sortFlightsByPrice);

export default router;
