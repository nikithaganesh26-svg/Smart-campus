const express = require("express");

const router = express.Router();

const {
    addVisitor,
    checkOutVisitor,
    getVisitors
} = require("../controllers/visitorController");


// ==========================================
// CHECK-IN VISITOR
// ==========================================

router.post("/check-in", addVisitor);


// ==========================================
// CHECK-OUT VISITOR
// ==========================================

router.post("/check-out", checkOutVisitor);


// ==========================================
// GET ALL VISITORS
// ==========================================

router.get("/", getVisitors);


module.exports = router;