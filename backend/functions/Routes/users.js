const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../Models/user");
const router = express.Router();

router.get("/:id", async(req, res) => {
  try {
    const user_id = req.params.id;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
});

router.post("/register", async(req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body.data;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(409)
        .send({ message: "User already registered with this email." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin,
    });

    await newUser.save();
    const token = newUser.generateAuthToken();

    res.status(201).send({
      token,
      id: newUser._id,
      isAdmin: newUser.isAdmin,
    });
  } catch (err) {
    res.status(500).send({ message: "Error registering user." });
  }
});

router.post("/login", async(req, res) => {
  try {
    const { email, password } = req.body.data;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid email or password." });
    }

    const token = user.generateAuthToken();
    res.send({
      token,
      userId: user._id,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    res.status(500).send({ message: "Server error during login." });
  }
});

module.exports = router;
