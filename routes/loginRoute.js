const express = require("express");
const loginRoutes = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

// login routes...
loginRoutes.get("/", async (req, res) => {
  res.render("login");
// res.render('login', { title: 'Login Page' });

});

loginRoutes.post("/login-check", async (req, res) => {
    console.log(req.body)

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
  let token = jwt.sign({_id:user._id,name: user.name}, "someprivatekey");
  // console.log("jwt token: ",token);
  res.send(token)
  // res.send("logged in successfully!");
});

module.exports = loginRoutes;
