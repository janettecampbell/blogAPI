// dependencies
const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const helmet = require("helmet");

const mongoConfig = require("./config/mongoConfig");
const blogRouter = require("./routes/blogsRouter");

const app = express();
const PORT = 5000;

// Middleware

// Routers
app.use("/blog", blogRouter);

// Root route for the App
app.get("/", (req, res) => {
  res.status(200).json("Welcome to my blog API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}...`);
  mongoConfig();
});
