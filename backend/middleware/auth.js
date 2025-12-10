const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

function auth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ errorMessage: "No token provided" });

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).json({ errorMessage: "Server configuration error" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user;

    next();
  } catch (err) {
    console.error("Authentication error:", err);
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ errorMessage: "Invalid token" });
    } else if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ errorMessage: "Token expired" });
    }
    res.status(401).json({ errorMessage: "Authentication failed" });
  }
}

module.exports = auth;
