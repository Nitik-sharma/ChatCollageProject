const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../userModel/user");
const authMiddleware = require("../middleware/middlewareAuth")
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const crypto = require("crypto");

dotenv.config();

const router = express.Router();

// Register the user 
router.post("/register",async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // check if user already exist 
        const existUser =await User.findOne({ email });

        if (existUser) {
            return res.status(400).json({ message: "User has already have an account !!" });
        }

        // hash password 
        const salt=await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt);

    

        // save the new user 
        const newUser = new User({ username, email, password:hashPassword });
        await newUser.save();
        
        res.send(201).json({ message: "user registered sucessfully !!" });

    } catch (error) {
        res.status(500).json({error:error.message})
    }
})



// Login the user

router.post("/login", async (req, res) => {
     const { email, password } = req.body;
    try {
        //    check if user exist 
        const user = await User.findOne({ email });
        console.log(email)
        if (!user) {
            return res.status(400).json({ message: "User not exist !" });
        }
        const matchPassword = await bcrypt.compare(password, user.password);
        console.log(password)
console.log(matchPassword)
        if (!matchPassword) {
            return res.status(400).json({message:"Invalid credentials"})
        }

        // Generate JWT Token
        const token=jwt.sign({id:user._id },process.env.JWT_SECRET,{expiresIn:"7d"})
        res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email },message:"Login sucessfully!" });


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// logout user (Client side remove tocken)

router.post("/logout", async (req, res) => {
    res.json({message:"user logged out sucessfully"})
})



router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to your profile", user: req.user });
});




// Nodemailer setup



router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Store token in database with expiration time (15 minutes)
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
        await user.save();

        // Create a password reset link
        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

        // Send mail with reset link
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset Request",
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: "Password reset link sent to your email." });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// 🛠 Reset Password Route
router.post("/reset-password/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        // Find user with matching reset token and valid expiration time
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        // Clear reset token fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();
        res.json({ message: "Password reset successfully." });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
module.exports = router;
