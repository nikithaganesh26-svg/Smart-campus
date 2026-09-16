const Visitor = require("../models/Visitor");


// Get visitor statistics
const getVisitorStats = async (req, res) => {
    try {

        // Total visitors
        const totalVisitors = await Visitor.countDocuments();


        // Currently active visitors
        const activeVisitors = await Visitor.countDocuments({
            status: "Active"
        });


        // Completed visits
        const completedVisits = await Visitor.countDocuments({
            status: "Completed"
        });


        // Visitors grouped by type
        const visitorsByType = await Visitor.aggregate([
            {
                $group: {
                    _id: "$visitorType",
                    count: { $sum: 1 }
                }
            }
        ]);


        // Average visit duration
        const durationResult = await Visitor.aggregate([
            {
                $match: {
                    duration: { $ne: null }
                }
            },
            {
                $group: {
                    _id: null,
                    averageDuration: {
                        $avg: "$duration"
                    }
                }
            }
        ]);


        const averageDuration =
            durationResult.length > 0
                ? Math.round(durationResult[0].averageDuration)
                : 0;


        res.json({
            success: true,

            statistics: {
                totalVisitors,
                activeVisitors,
                completedVisits,
                averageDuration,
                visitorsByType
            }
        });

    } catch (error) {

        console.error("Analytics error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch visitor statistics"
        });
    }
};


module.exports = {
    getVisitorStats
};