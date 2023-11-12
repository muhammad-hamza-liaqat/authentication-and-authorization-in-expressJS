const express = require("express");
const routes = express.Router();
const userDB = require("../models/userModel");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const app = express();
// google settinf gsmtp settings
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mh408800@gmail.com",
    pass: "fqplkcnwytbhzjjc",
  },
});
// home route
routes.get("/", (req, res) => {
  res.end("home page localhost://3000");
});
// registration form
routes.get("/register-user", async (req, res) => {
  res.render("registration");
});
// form handling route
routes.post("/register", async (req, res) => {
  try {
    // generating unique verification token 
    const verificationToken = uuidv4();
    // creating user..
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    const newUser = await userDB.create({
      ...req.body,
      password: hashedPassword,
      verificationToken,
      isVerified: false,
    });
    // mail body
    const mailOption = {
      from: "localhost@gmail.com",
      to: req.body.email,
      subject: "Account Verification",
      html: `<p>Click the following link to verify your account: <a href="http://localhost:3000/verify/${verificationToken}">Verify</a></p>`,
    };
    // handling the mail
    transporter.sendMail(mailOption, (e, info) => {
      if (e) {
        console.error("error sending verfication email", e);
        res.status(500).json({ message: "internal server error" });
      } else {
        console.log("email send", info.response);
        res.json({
          message: "Registration successful. Verification email sent.",
        });
      }
    });

    console.log("user created!",newUser);
    // res.redirect("/");
  } catch (error) {
    console.log("error while creating the user", error);
    res.status(500).json({ message: "interval server error" });
  }
});
// route to make the account active
routes.get("/verify/:token", async (req, res) => {
  const { token } = req.params;
  try {
    const user = await userDB.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ error: "user not found!" });
    }
    // updating the thing if user's token is matched
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    res.send("account verified successfully");
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});



module.exports = routes;
