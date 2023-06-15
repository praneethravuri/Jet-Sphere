const mongoose = require("mongoose");

// example document
/* 
{
  "email": "prav2500@gmail.com",
  "password": "$2b$10$Iza.dGqG.n4QxMGB0gz9iOJha0DJhb7SVQO/RrciXfdbDVwvUW9/O",
  "name": "Praneeth Ravuri",
  "createdAt": {
    "$date": "2023-06-15T08:41:07.624Z"
  },
  "updatedAt": {
    "$date": "2023-06-15T08:41:07.624Z"
  },
  "__v": 0
} 
*/

const credentialsSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add the email"],
    },
    password: {
      type: String,
      required: [true, "Please add the password"],
    },
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Credentials", credentialsSchema);
