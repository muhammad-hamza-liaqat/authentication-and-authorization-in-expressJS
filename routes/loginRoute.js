const express = require("express");
const loginRoutes = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// login routes...
loginRoutes.get("/", async (req, res) => {
  res.render("login");
});

loginRoutes.post("/login-check", async (req, res) => {
  // res.send(req.body);

  let user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(404)
      .send({ message: "user with this email is not registered!" });
  }

  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) {
    return res.status(401).send("invalid password");
  }
  if (!user.isVerified) {
    return res
      .status(404)
      .send({ message: "user is not verified! please verify!" });
  }
// {payload}, "secret key", optional callbacks?
// 32 characters of string -> secret key, the longer the better
  let token = jwt.sign(
    { _id: user._id, name: user.name },
    "my private JWT TOKEN",
    { expiresIn: "20s" }
  );
  const verifyToken = jwt.verify(token, "my private JWT TOKEN")

  // console.log("jwt token: ",token);
  res.send(token);
  // res.send(verifyToken);
  // res.send("logged in successfully!");
  
});

module.exports = loginRoutes;