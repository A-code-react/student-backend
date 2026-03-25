const jwt = require("jsonwebtoken");

const SECRET_KEY = "mysecretkey";

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, SECRET_KEY);

    req.user = decoded;

    next();

  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};