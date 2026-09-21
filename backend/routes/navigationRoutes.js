const express = require("express");

const {
    getRoute,
    getRouteByCoordinates
} = require("../../navigation/navigation");

const router = express.Router();


// ==========================================
// BUILDING → BUILDING
// ==========================================

router.post("/route", async (req, res) => {

    try {

        const {
            startName,
            destinationName
        } = req.body;


        if (!startName || !destinationName) {

            return res.status(400).json({
                success: false,
                message: "Start and destination are required."
            });

        }


        const route = await getRoute(
            startName,
            destinationName
        );


        res.json({
            success: true,
            route: route
        });


    } catch (error) {

        console.error(
            "Navigation error:",
            error
        );


        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


// ==========================================
// GPS → BUILDING
// ==========================================

router.post("/route-from-location", async (req, res) => {

    try {

        const {
            latitude,
            longitude,
            destinationName,
            campus
        } = req.body;


        if (
            typeof latitude !== "number" ||
            typeof longitude !== "number" ||
            !destinationName
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Latitude, longitude and destination are required."
            });

        }


        const route =
            await getRouteByCoordinates(
                latitude,
                longitude,
                destinationName,campus
            );


        res.json({
            success: true,
            route: route
        });


    } catch (error) {

        console.error(
            "Navigation error:",
            error
        );


        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


module.exports = router;