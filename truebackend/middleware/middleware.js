const jwt = require("jsonwebtoken");

// Middleware to validate JWT token
const validateToken = (req, res, next) => {
  const temp = req.headers.authorization;
   if (!temp) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = temp.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({ error: "Unauthorized", error });
    }

    req.user = decoded.userId;
    next();
  });
};

module.exports = validateToken;
