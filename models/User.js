
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  adult: {
    type: Boolean,
    default: false
  }
});
// Create the User and format of schema in one for export
const User = mongoose.model("subscribers", UserSchema);
module.exports = User;