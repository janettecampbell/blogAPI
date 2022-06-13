// dependencies
const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const helmet = require("helmet");

const mongoConfig = require("./config/mongoConfig");
const blogsRouter = require("./routes/blogsRouter");
const usersRouter = require("./routes/usersRouter");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// Routers
app.use("/blogs", blogsRouter);
app.use("/users", usersRouter);

// Root route for the App
app.get("/", (req, res) => {
  res.status(200).json("Welcome to my blog API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}...`);
  mongoConfig();
});
