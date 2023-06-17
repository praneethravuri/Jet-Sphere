const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        // connect to the database using the connection string in the .env file
        const connect = await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database connected", connect.connection.host, connect.connection.name);
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;