const express = require("express");
const User = require("../Model/userSchema");
const login = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

login.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ error: "Please Enter All The Fields" });

    const userLogin = await User.findOne({ username: username });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      const Token = await userLogin.generateAuthToken();
      console.log("Token in login.js is ", Token);
      res.cookie("jwToken", Token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      });

      if (!isMatch) {
        return res
          .status(400)
          .json({ error: "Invalid Credentials or You don't have any account" });
      } else {
        console.log("Login Successfull");
        return res.status(200).json({ message: "Login Successful" });
      }
    } else {
      return res
        .status(400)
        .json({ error: "Invalid Credentials or You don't have any account" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = login;
