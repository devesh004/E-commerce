const express = require("express");
const router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const newUser = new User(req.body);
  // console.log(newUser.active);
  const pass = CryptoJS.AES.encrypt(
    newUser.password,
    process.env.SECRET_PASS
  ).toString();
  newUser.password = pass;
  try {
    const savedUser = await newUser.save();
    // console.log(savedUser);
    const { password, ...others } = savedUser._doc;
    // console.log("OTHERS ARE ", others);
    const accessToken = jwt.sign(
      {
        id: savedUser._id,
        isAdmin: savedUser.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  const { username } = req.body;
  // console.log(username);
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(401).json("Wrong credentials!");
    }
    const hashedPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_PASS
    );
    const pass = hashedPass.toString(CryptoJS.enc.Utf8);
    if (req.body.password !== pass) {
      res.status(401).json("Wrong credentials!");
    }
    const { password, ...others } = user._doc;

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );
    // console.log(others);
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/logout", (req, res, next) => {
  // console.log("LOGOUT");
  req.headers.token = "";
  res.status(200).json("Logged Out Successfully!");
});

module.exports = router;
