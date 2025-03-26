const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoute = require("./routes/authRoute");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const multer = require("multer");



// Ensure file exist 
const uploadDir = "uploads";

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir,{recursive:true})
};

// SetUp multer

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }

});

const uplaod=multer({storage})



dotenv.config();

const app = express();

const port = process.env.PORT || 5001;

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch((error) => {
    console.error("MongoDB connection failed:", error);
});

// ✅ Middleware'
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:  "http://localhost:3000", // Allow frontend origin
    credentials: true, // Allow cookies
}));


// ✅ Routes
app.get("/", (req, res) => {
    res.send("Process is running...");
});

app.use("/api/auth", authRoute);





// ✅ Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



