const express = require("express");

const {
    getVisitorStats
} = require("./visitorAnalytics");

const router = express.Router();


// Get visitor statistics
router.get("/stats", getVisitorStats);


module.exports = router;