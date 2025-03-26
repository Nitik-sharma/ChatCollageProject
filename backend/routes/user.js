const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        console.log("Auth Header Received:", authHeader); // Debugging

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access Denied. No token provided." });
        }

        const token = authHeader.split(" ")[1]; // Extract token
        console.log("Extracted Token:", token); // Debugging

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("Decoded User Data:", req.user); // Debugging

        next();
    } catch (error) {
        console.error("JWT Error:", error);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired. Please log in again." });
        }
        return res.status(401).json({ message: "Invalid token." });
    }
};

module.exports = authMiddleware;
