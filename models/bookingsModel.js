const mongoose = require("mongoose");

const bookingsSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please enter an email"],
        },
        bookings: {
            type: Array,
            required: [true, "Please enter bookings in array"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Bookings", bookingsSchema);
