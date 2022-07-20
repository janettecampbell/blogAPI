const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // If no token
  if (!token) {
    return res.json("No Token Access Denied");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    console.log(decoded);

    next();
  } catch (error) {
    res.status(400).json("Token not valid");
  }
};
