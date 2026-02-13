const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  totalRooms: Number,
  bookedRooms: [Number],
});

module.exports = mongoose.model("Hotel", hotelSchema);
