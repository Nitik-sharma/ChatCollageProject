const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoute = require("./routes/authRoute");

dotenv.config();

const app = express();

const port = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB connect sucessfully")
}).catch((error) => {
    console.log(error)
})

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})

app.get("/", (req, res) => {
    res.send("Process is runnig.....")
})

app.use("/api/auth/",authRoute)







