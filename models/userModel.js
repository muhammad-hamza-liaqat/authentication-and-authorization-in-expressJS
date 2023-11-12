const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    default: false,
    type: Boolean,
  },
  verificationToken: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
