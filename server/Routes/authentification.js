const User = require("../models/userModel");
const auth = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

auth.post("/register", async (req, res) => {
  try {
    const {
      Name,
      Mail,
      Mobile,
      Password,
      ConfirmPassword,
      State,
      District,
      Gender,
    } = await req.body;
    const exist = await User.findOne({
      mail: Mail,
    });
    if (exist) {
      return res.status(500).json({
        errorMsg: "mail already exist please login",
      });
    }
    let user = new User({
      name: Name,
      mail: Mail,
      mobile: Mobile,
      password: Password,
      confirmPassword: ConfirmPassword,
      address: {
        State,
        District,
      },
      gender: Gender,
    });
    await user.save();
    return res.status(200).json({ successMsg: "Registered Successfully" });
  } catch (error) {
    return res.status(500).json({
      errorMsg: "server error",
      error: error.message,
    });
  }
});

auth.post("/login", async (req, res) => {
  try {
    const { Mail, Password } = await req.body;
    const checkMail = await User.findOne({
      mail: Mail,
    });
    if (!checkMail) {
      return res.status(404).json({
        errorMsg: "incorrect credentials",
      });
    }
    const decodePassword = await bcrypt.compare(Password, checkMail.password);
    if (!decodePassword) {
      return res.status(401).json({
        errorMsg: "incorrect credentials",
      });
    }

    // jwt
    const Token = jwt.sign({ id: checkMail._id }, process.env.JWT_PASSWORD, {
      expiresIn: "30d",
    });
    res.cookie("U_A", Token, {
      httpOnly: true,
      expires: 864000000,
      sameSite: "none",
      secure: true,
    });

    return res.status(201).json({
      errorMsg: "login successfully",
      Token,
      UserDet: {
        name: checkMail.name,
        email: checkMail.mail,
      },
    });
  } catch (error) {
    res.status(500).json({
      Error: "internal server error",
    });
  }
});

// cart

module.exports = auth;
