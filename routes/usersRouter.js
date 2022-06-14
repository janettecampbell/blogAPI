const express = require("express");
const usersModel = require("../models/usersSchema");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Get users
router.get("/", async (req, res) => {
  try {
    const user = await usersModel.find();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json("Bad request");
  }
});

// Create users
router.post(
  "/",
  [
    check("username", "Username is required"),
    check("email", "Please use a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).notEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters."
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const userData = req.body;
    const errors = validationResult(req);

    // Check for validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const userExists = await usersModel.findOne({ email: userData.email });

      // If user exists
      if (userExists) {
        return res.json("User already exists");
      }

      // Create new user
      const SALT = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(userData.password, SALT);
      userData.password = hashedPassword;
      const user = await usersModel.create(userData);

      // Create a new JWT Token
      const payload = {
        id: user._id,
        email: user.email,
      };

      const TOKEN = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "2 Days",
      });

      res.status(201).json({ user: user, token: TOKEN });
    } catch (error) {
      console.error(error);
      res.status(400).json("Bad request");
    }
  }
);

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await usersModel.find();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json("Bad request");
  }
});

// Update user by ID
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const newUserData = req.body;

  try {
    const user = await usersModel.findByIdAndUpdate(id, newUserData, {
      new: true,
    });
    res.status(202).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json("Bad request");
  }
});

// Delete user by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await usersModel.findByIdAndDelete(id);
    res.status(200).json("User was deleted");
  } catch (error) {
    console.error(error);
    res.status(400).json("Bad request");
  }
});

module.exports = router;
