const express = require("express");
var path=require('path');
var multer = require('multer');
const User = require("../Model/userSchema");
const updatedata=require("../Middlewares/updatedata");
const authenticate = require("../Middlewares/middleware");
const router = express.Router();
const dest=multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./Public/Images/');
    },
    filename: function (req, file, cb) {
      console.log("Request is : ",req.body.username);
      cb(null, req.body.username+'.jpg');
    }
})
var upload = multer({ storage: dest });
router.get("/", (req, res) => {
  res.cookie("token", "token");
  res.send("Hello World from register");
});

router.get("/signup",(req,res)=>{
  console.log(User);
  res.send("Signup");
});

router.post("/signup",upload.single('image'),async (req, res) => {
  if(req.body.email==""||req.body.username==""||req.body.password==""){
    res.status(400).json({error:"Please fill all the fields"});
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user){ 
        return res.json({ error: "User already exists" });}
      else {
        const user = new User(req.body);
        console.log(req.body);
        user
          .save()
          .then(() => {
            return res
              .status(201)
              .json({ message: "Account created successfully" });
          })
          .catch((err) => {
            return res.status(500).json({ error: err });
          });
      }
    })
    .catch((err) => {
      return err;
    });
});

router.get("/makecv", authenticate, (req, res) => {
  console.log("Make CV Router from backend");
  // res.send("Make CV Router from backend");
});

router.post("/update",updatedata,(req,res)=>{
  res.send("In update");
});
module.exports = router;
