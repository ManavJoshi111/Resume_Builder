const express = require("express");
const User = require("../Model/userSchema");
const makecv = express();
const jwt = require("jsonwebtoken");
const middleware = require("../Middlewares/middleware");

router.get("/makecv", authenticate, (req, res) => {
  console.log("Make CV Router from backend");
  res.send(req.rootUser);
});
