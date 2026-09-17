// ============================================================
// SMART CAMPUS - REAL WALKING NAVIGATION
// Member 3: Search + Navigation
// ============================================================

const { findLocation } = require("./search.js");

const VALHALLA_URL =
    "https://valhalla1.openstreetmap.de/route";

// ============================================================
// Get a real pedestrian route
// ============================================================

async function getRoute(startName, destinationName) {

    const start = findLocation(startName);
    const destination = findLocation(destinationName);

    // Validate starting location
    if (!start) {
        return {
            success: false,
            message: `Starting location "${startName}" was not found.`
        };
    }

    // Validate destination
    if (!destination) {
        return {
            success: false,
            message: `Destination "${destinationName}" was not found.`
        };
    }

    // Prevent navigation to the same location
    if (
        start.latitude === destination.latitude &&
        start.longitude === destination.longitude
    ) {
        return {
            success: false,
            message: "Starting point and destination are the same."
        };
    }

    // ========================================================
    // Valhalla pedestrian routing request
    // ========================================================

    const requestBody = {
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
    };

    try {

        const response = await fetch(
            VALHALLA_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(requestBody)
            }
        );

        // ====================================================
        // Check routing server response
        // ====================================================

        if (!response.ok) {
            throw new Error(
                `Routing server returned ${response.status}`
            );
        }

        const data = await response.json();

        // ====================================================
        // Check whether route exists
        // ====================================================

        if (
            !data.trip ||
            !data.trip.legs ||
            data.trip.legs.length === 0
        ) {
            return {
                success: false,
                message: "No walking route was found."
            };
        }

        const leg = data.trip.legs[0];

        // ====================================================
        // Decode route geometry
        // ====================================================

        const routeCoordinates =
            decodePolyline(leg.shape);

        // ====================================================
        // Distance
        // ====================================================

        const distanceKm =
            Number(
                leg.summary.length.toFixed(2)
            );

        const distanceMeters =
            Math.round(distanceKm * 1000);

        // ====================================================
        // Walking duration
        // ====================================================

        const durationMinutes =
            Math.max(
                1,
                Math.ceil(leg.summary.time / 60)
            );

        // ====================================================
        // Turn-by-turn instructions
        // ====================================================

        const instructions =
            (leg.maneuvers || []).map(
                function (maneuver) {

                    return {
                        instruction:
                            maneuver.instruction || "",

                        type:
                            maneuver.type || null,

                        length:
                            maneuver.length || 0,

                        time:
                            maneuver.time || 0
                    };
                }
            );

        // ====================================================
        // Return complete navigation result
        // ====================================================

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
                kilometers: distanceKm,
                meters: distanceMeters
            },

            duration: {
                minutes: durationMinutes
            },

            // Valhalla format:
            // [longitude, latitude]
            routeCoordinates,

            // Turn-by-turn navigation
            instructions
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
// Decode Valhalla encoded polyline
// ============================================================

function decodePolyline(encoded) {

    let index = 0;

    let latitude = 0;
    let longitude = 0;

    const coordinates = [];

    while (index < encoded.length) {

        // ----------------------------------------------------
        // Decode latitude
        // ----------------------------------------------------

        let result = 0;
        let shift = 0;
        let byte;

        do {

            byte =
                encoded.charCodeAt(index++) - 63;

            result |=
                (byte & 0x1f) << shift;

            shift += 5;

        } while (byte >= 0x20);

        const deltaLatitude =
            (result & 1)
                ? ~(result >> 1)
                : result >> 1;

        latitude += deltaLatitude;

        // ----------------------------------------------------
        // Decode longitude
        // ----------------------------------------------------

        result = 0;
        shift = 0;

        do {

            byte =
                encoded.charCodeAt(index++) - 63;

            result |=
                (byte & 0x1f) << shift;

            shift += 5;

        } while (byte >= 0x20);

        const deltaLongitude =
            (result & 1)
                ? ~(result >> 1)
                : result >> 1;

        longitude += deltaLongitude;

        // ----------------------------------------------------
        // Convert to decimal coordinates
        // ----------------------------------------------------

        const lat =
            latitude / 1e6;

        const lon =
            longitude / 1e6;

        // Valhalla gives longitude first
        coordinates.push([
            lon,
            lat
        ]);
    }

    return coordinates;
}


// ============================================================
// Create readable navigation summary
// ============================================================

function getNavigationSummary(route) {

    if (!route || !route.success) {

        return (
            route?.message ||
            "Navigation unavailable."
        );
    }

    return (
        `From ${route.start.name} ` +
        `to ${route.destination.name}. ` +
        `Distance: ${route.distance.kilometers} km. ` +
        `Walking time: approximately ` +
        `${route.duration.minutes} minutes.`
    );
}


// ============================================================
// Convert coordinates for Leaflet
// ============================================================
//
// Valhalla:
// [longitude, latitude]
//
// Leaflet:
// [latitude, longitude]
//
// This does NOT create a new map.
// It only prepares coordinates for the existing map.
//

function getLeafletCoordinates(route) {

    if (
        !route ||
        !route.success ||
        !route.routeCoordinates
    ) {
        return [];
    }

    return route.routeCoordinates.map(
        function ([longitude, latitude]) {

            return [
                latitude,
                longitude
            ];
        }
    );
}


// ============================================================
// Get clean navigation data for frontend/map integration
// ============================================================

function getNavigationData(route) {

    if (!route || !route.success) {

        return {
            success: false,
            message:
                route?.message ||
                "Navigation unavailable."
        };
    }

    return {

        success: true,

        start: route.start,

        destination: route.destination,

        distance: route.distance,

        duration: route.duration,

        routeCoordinates:
            route.routeCoordinates,

        leafletCoordinates:
            getLeafletCoordinates(route),

        instructions:
            route.instructions || []
    };
}


// ============================================================
// Export navigation functions
// ============================================================

module.exports = {

    getRoute,

    getNavigationSummary,

    getLeafletCoordinates,

    getNavigationData

};