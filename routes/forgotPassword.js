const express = require("express");
const forgot = express.Router();
const userDB = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const app = express();

forgot.get("/", (req, res) => {
  res.end("password endpoint");
});

forgot.post("/", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const existingUser = await userDB.findOne({ email: req.body.email });
    // checking existing iser
    if (!existingUser) {
      return res
        .status(404)
        .send({ message: "user with this email is not registered." });
    }
    //
    if (!existingUser.isVerified) {
      return res.status(403).send({ message: " user is not verified!" });
    }

    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    const update = await userDB.findOneAndUpdate(
      { email: req.body.email },
      {
        password: hashedPassword,
      }
    );
    res.status(200).send({ message: "password changed successfully" });
  } catch (error) {
    console.log("error while updating the user's password", error);
    res
      .status(500)
      .send({ message: " error- while updating the user' password" });
  }
});

module.exports = forgot;

// $2b$10$u37f8jiwJ9kL2izdFGQAfevf6gGmoSAC8QWbP0ocDMdAM0D0ZzByO
// $2b$10$vuBNfDCqaBzBp3BDVC2Bxen6DpXKsmrOOC5JLGQ7pxCOKVLHZiXq6
