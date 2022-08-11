const express = require("express");
const blogModel = require("../models/blogsSchema");
const authMiddleware = require("../middleware/authMiddleware");

// ========= Create a Router =========
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
 */

/**
 * @swagger
 * tags:
 *  name: Blogs
 *  description: The blog managing API
 */

/**
 * @swagger
 * /blogs:
 *  get:
 *    summary: Returns a list of all the blogs
 *    tags: [Blogs]
 *    responses:
 *      200:
 *        description: The list of all the blogs
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Blog'
 *
 */
// ========== Get blogs ============
router.get("/", authMiddleware, async (req, res) => {
  try {
    const blog = await blogModel.find();

    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /blogs/public:
 *  get:
 *    summary: Returns a list of all the public blogs
 *    tags: [Blogs]
 *    responses:
 *      200:
 *        description: The list of all the public blogs
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Blog'
 *
 */
// ========= get public blogs ==================
router.get("/public", authMiddleware, async (req, res) => {
  try {
    const blog = await blogModel.find({ private: false });
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /blogs:
 *  post:
 *    summary: Creates a blog post
 *    tags: [Blogs]
 *    responses:
 *      201:
 *        description: The blog posted successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Blog'
 *
 */
// ============== Create blog ==============
router.post("/", authMiddleware, async (req, res) => {
  // gets data from request
  const blogData = req.body;

  blogData.user = req.user.id;
  blogData.created_by = req.user.username;

  try {
    // create blog in the DB
    const blog = await blogModel.create(blogData);
    //sent back the response
    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(400).json("Bad request");
  }
});

/**
 * @swagger
 * /blogs/{id}:
 *  get:
 *    summary: Gets blog by ID
 *    tags: [Blogs]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The blog ID
 *    responses:
 *      200:
 *        description: The blog was retrieved successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Blog'
 *
 *      400:
 *        description: The ID was not found
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Blog'
 */
// ========== Get blog by ID ============
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

/**
 * @swagger
 * /blogs/{id}:
 *  put:
 *    summary: Updates blog by ID
 *    tags: [Blogs]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The blog ID
 *    responses:
 *      202:
 *        description: The blog was updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Blog'
 */
// ============ Update blog by ID ================
router.put("/:id", authMiddleware, async (req, res) => {
  const id = req.params.id.trim();
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

/**
 * @swagger
 * /blogs/{id}:
 *  delete:
 *    summary: Deletes blog by ID
 *    tags: [Blogs]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The blog ID
 *    responses:
 *      200:
 *        description: The blog was deleted successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Blog'
 */
//! ============ Delete a blog =============
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
