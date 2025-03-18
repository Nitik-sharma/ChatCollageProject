const express = require("express");
const dotenv = require("dotenv");
const router = express.Router();
const User = require("../userModel/user");
const jwt = require("jsonwebtoken");


dotenv.config();
// middlewere to verify

const authMiddlewere = (req, res, next) => {
const token = req.header("Authorization");
if (!token) return res.status(401).json({ message: "Acess denied not token is provided " });

try {
// verify token
const decoded = jwt.verify(token, process.env.JWT_SECRET);

// Attached user id to request
req.user = decoded;
next();
} catch (error) {
res.status(400).json({ message: "Invalid tocken" });
}
}



// api to get logged in user Detail

router.get("/user", authMiddlewere, async (req, res) => {
try {
const user = await User.findById(req.user.id).select("-password");
if (!user) {
return res.status(400).json({ message: "user not found" });


}
res.json(user);
} catch (error) {
res.status(500).json({ error: error.message });
}
})
module.exports = router;

