const express = require("express");
const blogModel = require("../models/blogsSchema");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get blogs
router.get("/", authMiddleware, async (req, res) => {
  try {
    const blog = await blogModel.find();
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
  }
});

// Create blog
router.post("/", authMiddleware, async (req, res) => {
  const blogData = req.body;

  try {
    const blog = await blogModel.create(blogData);
    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(400).json("Bad request");
  }
});

// Get blog by ID
router.get("/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;

  try {
    const blog = await blogModel.findById(id);
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(400).json("ID not found");
  }
});

// Update blog by ID
router.put("/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  const newBlogData = req.body;

  try {
    const blog = await blogModel.findByIdAndUpdate(id, newBlogData, {
      new: true,
    });
    res.status(202).json(blog);
  } catch (error) {
    console.error(error);
  }
});

// Delete a blog
router.delete("/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await blogModel.findByIdAndDelete(id);
    res.status(200).json("Blog was deleted");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
