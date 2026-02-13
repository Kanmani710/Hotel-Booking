const router = require("express").Router();
const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");
const verify = require("../verifyToken");

router.post("/:hotelId", verify, async (req, res) => {
  const { roomNumber } = req.body;
  const hotel = await Hotel.findById(req.params.hotelId);

  if (hotel.bookedRooms.includes(roomNumber))
    return res.status(400).json({ message: "Room already booked" });

  hotel.bookedRooms.push(roomNumber);
  await hotel.save();

  const booking = new Booking({
    userId: req.user.id,
    hotelId: hotel._id,
    roomNumber,
  });
  await booking.save();

  res.json(booking);
});

router.get("/my", verify, async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id }).populate(
    "hotelId"
  );
  res.json(bookings);
});

module.exports = router;
