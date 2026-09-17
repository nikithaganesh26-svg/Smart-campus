const Visitor = require("../models/Visitor");


// ==========================================
// CHECK-IN VISITOR
// ==========================================

const addVisitor = async (req, res) => {
    try {

        const {
            name,
            email,
            phone,
            visitorType,
            scanId
        } = req.body;


        // Check required fields
        if (!name || !email || !phone || !visitorType || !scanId) {

            return res.status(400).json({
                success: false,
                message: "Name, email, phone, visitor type and scan ID are required."
            });

        }


        // Current check-in time
        const checkInTime = new Date();


        // Create visitor
        const visitor = new Visitor({

            name: name,
            email: email,
            phone: phone,
            visitorType: visitorType,
            scanId: scanId,

            checkInTime: checkInTime,

            checkOutTime: null,

            duration: null,

            status: "Active"

        });


        // Save to MongoDB
        await visitor.save();


        res.status(201).json({

            success: true,

            message: "Visitor checked in successfully!",

            visitor: visitor

        });


    } catch (error) {

        console.error("Error adding visitor:", error);

        res.status(500).json({

            success: false,

            message: "Server error"

        });

    }
};



// ==========================================
// CHECK-OUT VISITOR
// ==========================================

const checkOutVisitor = async (req, res) => {

    try {

        const { visitorId } = req.body;


        // Check visitor ID
        if (!visitorId) {

            return res.status(400).json({

                success: false,

                message: "Visitor ID is required."

            });

        }


        // Find visitor
        const visitor = await Visitor.findById(visitorId);


        if (!visitor) {

            return res.status(404).json({

                success: false,

                message: "Visitor not found."

            });

        }


        // Check if already checked out
        if (visitor.status === "Completed") {

            return res.status(400).json({

                success: false,

                message: "Visitor has already checked out."

            });

        }


        // Current checkout time
        const checkOutTime = new Date();


        // Calculate duration
        const durationMilliseconds =
            checkOutTime.getTime() -
            visitor.checkInTime.getTime();


        // Convert milliseconds to minutes
        const durationMinutes =
            Math.floor(durationMilliseconds / (1000 * 60));


        // Update visitor
        visitor.checkOutTime = checkOutTime;

        visitor.duration = durationMinutes;

        visitor.status = "Completed";


        // Save changes
        await visitor.save();


        res.json({

            success: true,

            message: "Visitor checked out successfully!",

            visitor: visitor

        });


    } catch (error) {

        console.error("Error checking out visitor:", error);

        res.status(500).json({

            success: false,

            message: "Server error"

        });

    }
};



// ==========================================
// GET ALL VISITORS
// ==========================================

const getVisitors = async (req, res) => {

    try {

        const visitors = await Visitor.find()
            .sort({
                createdAt: -1
            });


        res.json({

            success: true,

            visitors: visitors

        });


    } catch (error) {

        console.error("Error getting visitors:", error);

        res.status(500).json({

            success: false,

            message: "Server error"

        });

    }

};



module.exports = {

    addVisitor,

    checkOutVisitor,

    getVisitors

};