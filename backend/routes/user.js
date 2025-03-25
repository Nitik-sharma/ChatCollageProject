const express = require("express");
const dotenv = require("dotenv");
const router = express.Router();
const User = require("../userModel/user");
const jwt = require("jsonwebtoken");


dotenv.config();
// middlewere to verify
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; 
    if (!token) return res.status(401).json({ message: "Access denied, no token provided." });

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach user id to request
        req.user = decoded;
        
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};




// api to get logged in user Detail


