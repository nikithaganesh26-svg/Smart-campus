const express = require("express");

const router = express.Router();

const {
    addVisitor,
    getVisitors
} = require("../controllers/visitorController");

router.post("/", addVisitor);

router.get("/", getVisitors);

module.exports = router;