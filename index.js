const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./DB/ConnectDB");
const userRoute = require("./routes/User.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const articleRoute = require("./routes/Article.route");
const jobRoute = require("./routes/Job.route");
const testimonialRoute = require("./routes/Testimonial.route");

// Services
dotenv.config();

const PORT = process.env.PORT || 5000;

// Initialization of express application instance
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: ["https://www.apexbridge.ai","http://localhost:3001"],
    credentials: true,
}))

//Routes
app.use("/api/v1", userRoute);
app.use("/api/v1", articleRoute);
app.use("/api/v1", jobRoute)
app.use("/api/v1", testimonialRoute)

app.get("/api", (req,res) => {
    res.send("Welcome to the Backend for Apex Bridge")
})

app.listen(PORT, () => {
    connectDB()
    console.log(`Application is Running at port ${PORT}`)
})