const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
        
    },
     resetPasswordToken: {
        type: String, // Store the hashed token
    },
    resetPasswordExpires: {
        type: Date, // Expiration time for the token
    },
    profilePic: { type: String, default: "" }

})

module.exports = mongoose.model("User", userSchema);