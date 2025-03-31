const jwt = require("jsonwebtoken");
const User = require("../userModel/user");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // Extract token from "Bearer <token>"
  const token = authHeader && authHeader.startsWith("Bearer ") 
    ? authHeader.split(" ")[1] 
    : null;
  
  console.log("Token received in middleware:", token);

  // ✅ Check if token is missing
  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    // ✅ Verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    console.log("User verified successfully:", req.user);
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    
    // Clear cookie if token is invalid (optional)
    res.clearCookie("token");

    return res.status(400).json({ message: "Invalid or Expired Token" });
  }
};

module.exports = authMiddleware;
