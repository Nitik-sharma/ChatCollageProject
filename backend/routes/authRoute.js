const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../userModel/user");
const authMiddleware=require("../middleware/middlewareAuth")

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


module.exports = router;
