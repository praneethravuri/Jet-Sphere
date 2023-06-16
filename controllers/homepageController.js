const asyncHandler = require("express-async-handler");
const Flights = require("../models/flightsModel");
const Bookings = require("../models/bookingsModel");

//@desc homepage
//@route POST /homepage
//@access Private
// API URL - http://localhost:5000/homepage

// send a message when homepage is reached
const displayBookings = asyncHandler(async (req, res) => {
    const email = req.session.email;
    console.log(email);
    if (!email) {
        res.status(401);
        throw new Error("Unauthorized access");
    }

    const userBookings = await Bookings.findOne({ email });
    const userFlights = userBookings.bookings;

    console.log(userFlights)
    console.log(`The bookings of ${email} are ${userFlights}`);

    res.status(200).json({ message: "finished" });

    //const bookingsArray = bookings.bookings;
});

module.exports = { displayBookings };
