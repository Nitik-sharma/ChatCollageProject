const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token  = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1]: null;
  /**
   * your cookies mechanism not working.
   * plus u are sending authorization header to pass in token
   * welp :)
   */
  // const token = req.cookies.token ;
  
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;