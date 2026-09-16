const Visitor = require("../backend/models/Visitor");


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
            },
            {
                $sort: {
                    count: -1
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


        // Visitors grouped by date
        const visitorsByDate = await Visitor.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$checkInTime"
                        }
                    },
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            }
        ]);
        // Visitors grouped by destination
const visitorsByDestination = await Visitor.aggregate([
    {
        $match: {
            destination: {
                $ne: ""
            }
        }
    },
    {
        $group: {
            _id: "$destination",
            count: {
                $sum: 1
            }
        }
    },
    {
        $sort: {
            count: -1
        }
    }
]);


        // Send statistics
        res.json({
            success: true,

            statistics: {
                totalVisitors,
                activeVisitors,
                completedVisits,
                averageDuration,
                visitorsByType,
                visitorsByDate,
                visitorsByDestination
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