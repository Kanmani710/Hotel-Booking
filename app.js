const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("./models/User");
const Booking = require("./models/Booking");

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Route for booking form
app.post("/book", async (req, res) => {
  const { name, email, password, hotel } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    user = new User({ name, email, password });
    await user.save();
  }

  const booking = new Booking({ user: user._id, hotel });
  await booking.save();

  res.send(`<h2>✅ Room booked successfully for ${name} at ${hotel}</h2>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
