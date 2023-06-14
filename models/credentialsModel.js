const mongoose = require("mongoose");

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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Credentials", credentialsSchema);