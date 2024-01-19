import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
    flight_number: {
        type: String,
        required: true
    },
    airline: {
        type: String,
        required: true
    },
    departure_city: {
        type: String,
        required: true
    },
    departure_airport: {
        type: String,
        required: true
    },
    arrival_city: {
        type: String,
        required: true
    },
    arrival_airport: {
        type: String,
        required: true
    },
    departure_time: {
        type: String,
        required: true
    },
    arrival_time: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bookedFlights: {
        type: [flightSchema]
    }
});

export default mongoose.model('User', userSchema);
