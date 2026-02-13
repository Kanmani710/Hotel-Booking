const router = require("express").Router();
const Hotel = require("../models/Hotel");
const verify = require("../verifyToken");

router.post("/", verify, async (req, res) => {
  const hotel = new Hotel(req.body);
  await hotel.save();
  res.json(hotel);
});

router.get("/", async (req, res) => {
  const hotels = await Hotel.find();
  res.json(hotels);
});

module.exports = router;
