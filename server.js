// dependencies
const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const mongoConfig = require("./config/mongoConfig");
const blogsRouter = require("./routes/blogsRouter");
const usersRouter = require("./routes/usersRouter");
const authRouter = require("./routes/authRouter");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: "A simple Express Blog API",
    },
    servers: [
      {
        url: "https://jan-blog-app.herokuapp.com",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);

const app = express();
const PORT = process.env.PORT || 5000;

// =========== Swagger Documentation =============
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// =============== Middleware =================
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

// Routers
app.use("/blogs", blogsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

// ================ Root route for the App ============
app.get("/", (req, res) => {
  res.status(200).json("Welcome to my blog API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}...`);
  mongoConfig();
});
