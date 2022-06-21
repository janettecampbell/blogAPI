const express = require("express");
const blogModel = require("../models/blogsSchema");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Blog:
 *      type: object
 *      required:
 *        - created_by
 *        - created_at
 *        - blog_title
 *        - blog_content
 *        - private
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the blog
 *        created_by:
 *          type: string
 *          description: Who created the blog
 *        created_at:
 *          type: date
 *          description: When the blog was created
 *        blog_title:
 *          type: string
 *          description: The blog title
 *        blog_content:
 *          type: string
 *          description: The content of the blog post
 *        private:
 *          type: boolean
 *          description: Whether the blog is public or private
 *      example:
 *        id: 62a8934b1fe50f2bc0759670
 *        created_by: Moonbeam
 *        created_at: 2022-06-14T13:55:08.482Z
 *        blog_title: MoonBeam Test8
 *        blog_content: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eleifend, mauris at tincidunt
 *        private: false
 *
 *
 */

// Get blogs
router.get("/", authMiddleware, async (req, res) => {
  try {
    const blog = await blogModel.find();
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
  }
});

// get public blogs
router.get("/public", authMiddleware, async (req, res) => {
  try {
    const blog = await blogModel.find({ private: false });
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
