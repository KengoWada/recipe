const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    const response = { message: "Invalid token", error: null, data: null };
    return res.status(401).json(response);
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    const response = { message: "Invalid token", error: null, data: null };
    return res.status(403).json(response);
  }
};

module.exports = authenticateToken;
