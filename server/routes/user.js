const router = require("express").Router();
const mongoose = require("mongoose");
const express = require("express");
let user = require("./../models/user.model");
// const user = mongoose.model("user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./../keys");
const requireLogin = require("./../middleware/requireLogin");
const nodemailer = require("nodemailer");
const sendgridTrasport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");

const transport = nodemailer.createTransport(
  sendgridTrasport({
    auth: {
      api_key:
        "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",
    },
  })
);

router.get("/protected", requireLogin, (req, res) => {
  res.send("Hello user");
});

router.post("/signup", (req, res) => {
  const { userName, email, password } = req.body;
  if (!email || !password || !userName) {
    return res.status(422).json({ error: "Please fill the all fields" });
  }
  user
    .findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "user already exist with that email" });
      }

      const token = jwt.sign(
        { userName, email, password },
        process.env.JWT_ACC_ACTIVATE,
        { expiresIn: "20m" }
      );

      bcrypt.hash(password, 12).then((hashedPassword) => {
        const users = new user({
          email,
          password: hashedPassword,
          userName,
        });
        users.save().then((users) => {
          transport.sendMail({
            to: users.email,
            from: "invictadts@gmail.com",
            subject: "Welcome to Invicta-DTS!",
            html: `
            <h2>Welcome to Invicta-DTS</h2>
            <h4>Congratulations! Your Account Created Successfully.</h4>
            <p>We're glad you're here! Click in this link <a href = "http://localhost:3000/account-activation/${token}"><b>Confirm Email Address</b></a> to <b>SignIn</b>. </p>
            `,
          });
          // console.log(user.email)
          res.json({
            message: "Successfully Saved",
          });
          // .catch(err => {
          //   console.log(err);
          // });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .json({ error: "Please provide the email and password" });
  }
  user.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "invalid username password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // res.json({message:"Succesfully Sgn In"})
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, userName, email } = savedUser;
          res.json({ token, user: { _id, userName, email } });
        } else {
          return res.status(422).json({ error: "invalid username password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
router.post("/reset-password", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    user.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res.status(422).json({
          error: "User dont exist with this email",
        });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        transport.sendMail({
          to: user.email,
          from: "dtsinvicta@gmail.com",
          subject: "Password reset",
          html: `
                <p> You requested for password reset </p>
                <h5>click this <a href = "http://localhost:3000/reset/${token}">link</a> to reset password</h5>
              `,
        });
        res.json({ message: "Check your email" });
      });
    });
  });
});
router.post("/new-password", (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  user
    .findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        return res.status(422).json({ error: "Try again session expired" });
      }
      bcrypt.hash(newPassword, 12).then((hashedPassword) => {
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.expireToken = undefined;
        user.save().then((savedUser) => {
          res.json({ message: "Password updated success" });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
