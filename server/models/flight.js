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

export default mongoose.model('Flight', flightSchema);
