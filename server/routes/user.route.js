const express = require("express");

const userRouter = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../models/user.model");

// userRouter.use(express.json());
require("dotenv").config();

userRouter.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  //   console.log(req.body);
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new UserModel({ name, email, password: hash, role });
      await user.save();
      res.status(200).send({
        msg: "The new user has been registered",
        registeredUser: user,
      });
    });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).send({
            msg: "Login successful!",
            token: jwt.sign(
              { userId: user._id, role: user.role },
              process.env.JWT_SECRET_KEY
            ),
            role: user.role,
          });
        }
        // result == true
      });
    } else {
      res.status(200).send({ msg: "Wrong Credentials" });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

module.exports = {
  userRouter,
};
