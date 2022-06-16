const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/usersSchema");

const router = express.Router();

// User Login
router.post(
  "/",
  [
    check("email", "Please provide a valid email address").isEmail(),
    check("password", "Please check your password").notEmpty(),
  ],
  async (req, res) => {
    const userData = req.body;

    const errors = validationResult(req);

    // Check for validation errors
    if (!errors.isEmpty()) {
      return res.json(errors.array());
    }

    try {
      const user = await userModel.findOne({ email: userData.email });

      if (!user) {
        return res.json("User not found");
      }

      // Compare plaintext password to hashed password
      const isMatch = await bcrypt.compare(userData.password, user.password);

      if (!isMatch) {
        return res.json("Password is not correct");
      }

      req.user = user;

      // Create a new JWT Token

      const payload = {
        id: user._id,
        email: user.email,
      };

      const TOKEN = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "2 days",
      });

      res.status(201).json({
        user: user,
        token: TOKEN,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json("Server Error...");
    }
  }
);

module.exports = router;
