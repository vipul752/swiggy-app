const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const User = require("./user");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(
  cors({
    origin: "http://localhost:1234",
    methods: "GET,POST",
    allowedHeaders: "Content-Type",
  })
);

app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://vipul1:vipul123@authapp.hz2n5r9.mongodb.net/swiggy")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("failed to connect MongoDB", err));

const JWT = "vipul";

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, mobileNumber } = req.body;

    if (!name || !email || !password || !mobileNumber) {
      return res.status(422).json({ error: "Please fill all fields" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashPassword,
      mobileNumber,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Plz fill the data" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT || 3000}`);
});
