// ============================================================
// SMART CAMPUS - NAVIGATION MODULE
// Member 3: Search + Navigation
// ============================================================

const {
    findLocation
} = require("./search");


// ============================================================
// VALHALLA ROUTING SERVICE
// ============================================================

const VALHALLA_URL =
    "https://valhalla1.openstreetmap.de/route";


// ============================================================
// DECODE VALHALLA POLYLINE
// ============================================================

function decodeValhallaPolyline(encoded) {

    let index = 0;
    let latitude = 0;
    let longitude = 0;

    const coordinates = [];

    while (index < encoded.length) {

        let shift = 0;
        let result = 0;
        let byte;

        do {
            byte =
                encoded.charCodeAt(index++) - 63;

            result |=
                (byte & 0x1f) << shift;

            shift += 5;

        } while (byte >= 0x20);

        const latitudeChange =
            (result & 1)
                ? ~(result >> 1)
                : result >> 1;

        latitude += latitudeChange;


        shift = 0;
        result = 0;

        do {
            byte =
                encoded.charCodeAt(index++) - 63;

            result |=
                (byte & 0x1f) << shift;

            shift += 5;

        } while (byte >= 0x20);

        const longitudeChange =
            (result & 1)
                ? ~(result >> 1)
                : result >> 1;

        longitude += longitudeChange;


        coordinates.push([
            longitude / 1e6,
            latitude / 1e6
        ]);
    }

    return coordinates;
}


// ============================================================
// GET ROUTE USING LOCATION NAMES
// ============================================================

async function getRoute(
    startName,
    destinationName
) {

    const start =
        findLocation(startName);

    const destination =
        findLocation(destinationName);


    // --------------------------------------------------------
    // VALIDATE START
    // --------------------------------------------------------

    if (!start) {

        return {
            success: false,
            message:
                `Starting location "${startName}" was not found.`
        };
    }


    // --------------------------------------------------------
    // VALIDATE DESTINATION
    // --------------------------------------------------------

    if (!destination) {

        return {
            success: false,
            message:
                `Destination "${destinationName}" was not found.`
        };
    }


    // --------------------------------------------------------
    // SAME LOCATION CHECK
    // --------------------------------------------------------

    if (
        start.latitude === destination.latitude &&
        start.longitude === destination.longitude
    ) {

        return {
            success: false,
            message:
                "Starting location and destination are the same."
        };
    }


    try {

        // ----------------------------------------------------
        // SEND REQUEST TO VALHALLA
        // ----------------------------------------------------

        const response =
            await fetch(
                VALHALLA_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        locations: [

                            {
                                lat: start.latitude,
                                lon: start.longitude,
                                type: "break"
                            },

                            {
                                lat: destination.latitude,
                                lon: destination.longitude,
                                type: "break"
                            }

                        ],

                        costing: "pedestrian",

                        units: "kilometers",

                        directions_options: {
                            units: "kilometers"
                        }

                    })
                }
            );


        // ----------------------------------------------------
        // CHECK RESPONSE
        // ----------------------------------------------------

        if (!response.ok) {

            throw new Error(
                `Valhalla request failed with status ${response.status}`
            );
        }


        const data =
            await response.json();


        // ----------------------------------------------------
        // CHECK ROUTE
        // ----------------------------------------------------

        if (
            !data.trip ||
            !data.trip.legs ||
            data.trip.legs.length === 0
        ) {

            return {
                success: false,
                message:
                    "No walking route was found."
            };
        }


        const leg =
            data.trip.legs[0];


        // ----------------------------------------------------
        // DECODE ROUTE
        // ----------------------------------------------------

        const routeCoordinates =
            decodeValhallaPolyline(
                leg.shape
            );


        // ----------------------------------------------------
        // RETURN ROUTE INFORMATION
        // ----------------------------------------------------

        return {

            success: true,

            start: {
                name: start.name,
                latitude: start.latitude,
                longitude: start.longitude
            },

            destination: {
                name: destination.name,
                latitude: destination.latitude,
                longitude: destination.longitude
            },

            distance: {

                kilometers:
                    Number(
                        data.trip.summary.length.toFixed(2)
                    ),

                meters:
                    Math.round(
                        data.trip.summary.length * 1000
                    )
            },

            duration: {

                minutes:
                    Math.ceil(
                        data.trip.summary.time / 60
                    )
            },

            routeCoordinates,

            instructions:
                leg.maneuvers?.map(
                    (maneuver) => ({

                        instruction:
                            maneuver.instruction,

                        type:
                            maneuver.type,

                        length:
                            maneuver.length,

                        time:
                            maneuver.time

                    })
                ) || []

        };

    } catch (error) {

        console.error(
            "Navigation error:",
            error
        );

        return {

            success: false,

            message:
                "Unable to calculate the walking route."

        };
    }
}


// ============================================================
// GET ROUTE USING GPS COORDINATES
// ============================================================

async function getRouteByCoordinates(
    startLatitude,
    startLongitude,
    destinationName,
    campus
) {

    // --------------------------------------------------------
    // FIND DESTINATION
    // --------------------------------------------------------

    const destination =
    findLocation(destinationName, campus);



    // --------------------------------------------------------
    // VALIDATE DESTINATION
    // --------------------------------------------------------

    if (!destination) {

        return {

            success: false,

            message:
                `Destination "${destinationName}" was not found.`

        };
    }


    // --------------------------------------------------------
    // VALIDATE GPS COORDINATES
    // --------------------------------------------------------

    if (
        typeof startLatitude !== "number" ||
        typeof startLongitude !== "number" ||
        !Number.isFinite(startLatitude) ||
        !Number.isFinite(startLongitude)
    ) {

        return {

            success: false,

            message:
                "Invalid starting coordinates."

        };
    }


    // --------------------------------------------------------
    // SAME LOCATION CHECK
    // --------------------------------------------------------

    if (
        startLatitude === destination.latitude &&
        startLongitude === destination.longitude
    ) {

        return {

            success: false,

            message:
                "Starting location and destination are the same."

        };
    }


    try {

        // ----------------------------------------------------
        // SEND GPS + DESTINATION TO VALHALLA
        // ----------------------------------------------------

        const response =
            await fetch(
                VALHALLA_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        locations: [

                            {
                                lat: startLatitude,
                                lon: startLongitude,
                                type: "break"
                            },

                            {
                                lat: destination.latitude,
                                lon: destination.longitude,
                                type: "break"
                            }

                        ],

                        costing: "pedestrian",

                        units: "kilometers",

                        directions_options: {
                            units: "kilometers"
                        }

                    })
                }
            );


        // ----------------------------------------------------
        // CHECK RESPONSE
        // ----------------------------------------------------

        if (!response.ok) {

            throw new Error(
                `Valhalla request failed with status ${response.status}`
            );
        }


        const data =
            await response.json();


        // ----------------------------------------------------
        // CHECK ROUTE
        // ----------------------------------------------------

        if (
            !data.trip ||
            !data.trip.legs ||
            data.trip.legs.length === 0
        ) {

            return {

                success: false,

                message:
                    "No walking route was found."

            };
        }


        const leg =
            data.trip.legs[0];


        // ----------------------------------------------------
        // DECODE ROUTE
        // ----------------------------------------------------

        const routeCoordinates =
            decodeValhallaPolyline(
                leg.shape
            );


        // ----------------------------------------------------
        // RETURN ROUTE INFORMATION
        // ----------------------------------------------------

        return {

            success: true,

            start: {

                latitude:
                    startLatitude,

                longitude:
                    startLongitude

            },

            destination: {

                name:
                    destination.name,

                latitude:
                    destination.latitude,

                longitude:
                    destination.longitude

            },

            distance: {

                kilometers:
                    Number(
                        data.trip.summary.length.toFixed(2)
                    ),

                meters:
                    Math.round(
                        data.trip.summary.length * 1000
                    )

            },

            duration: {

                minutes:
                    Math.ceil(
                        data.trip.summary.time / 60
                    )

            },

            routeCoordinates,

            instructions:
                leg.maneuvers?.map(
                    (maneuver) => ({

                        instruction:
                            maneuver.instruction,

                        type:
                            maneuver.type,

                        length:
                            maneuver.length,

                        time:
                            maneuver.time

                    })
                ) || []

        };

    } catch (error) {

        console.error(
            "Coordinate routing error:",
            error
        );

        return {

            success: false,

            message:
                "Unable to calculate the walking route."

        };
    }
}


// ============================================================
// NAVIGATION SUMMARY
// ============================================================

function getNavigationSummary(route) {

    if (
        !route ||
        !route.success
    ) {

        return null;
    }


    return {

        from:
            route.start.name ||
            "Current location",

        to:
            route.destination.name,

        distance:
            route.distance.kilometers,

        duration:
            route.duration.minutes

    };
}


// ============================================================
// CONVERT ROUTE TO LEAFLET COORDINATES
// ============================================================
//
// Valhalla gives:
//
// [longitude, latitude]
//
// Leaflet needs:
//
// [latitude, longitude]
//
// ============================================================

function getLeafletCoordinates(
    route
) {

    if (
        !route ||
        !route.routeCoordinates
    ) {

        return [];
    }


    return route.routeCoordinates.map(
        (coordinate) => [

            coordinate[1],
            coordinate[0]

        ]
    );
}


// ============================================================
// GET COMPLETE NAVIGATION DATA
// ============================================================

function getNavigationData(route) {

    if (
        !route ||
        !route.success
    ) {

        return null;
    }


    return {

        success:
            route.success,

        start:
            route.start,

        destination:
            route.destination,

        distance:
            route.distance,

        duration:
            route.duration,

        routeCoordinates:
            route.routeCoordinates,

        leafletCoordinates:
            getLeafletCoordinates(route),

        instructions:
            route.instructions

    };
}


// ============================================================
// EXPORTS
// ============================================================

module.exports = {

    getRoute,

    getRouteByCoordinates,

    getNavigationSummary,

    getLeafletCoordinates,

    getNavigationData

};