const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Visitor routes
const visitorRoutes = require("./routes/visitorRoutes");

app.use("/api/visitors", visitorRoutes);

// Analytics routes
const analyticsRoutes = require("./analytics/analyticsRoutes");

app.use("/api/analytics", analyticsRoutes);

// Navigation routes
const navigationRoutes = require("./routes/navigationRoutes");

app.use("/api/navigation", navigationRoutes);

// Home route
app.get("/", (req, res) => {
    res.send("Smart Campus Backend is running!");
});


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });


// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
