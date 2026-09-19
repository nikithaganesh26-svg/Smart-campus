// ============================================================
// SMART CAMPUS - SEARCH MODULE
// Member 3: Search + Navigation
// ============================================================

// Actual named locations from the campus GeoJSON.
// Coordinates are representative points for map integration.

const locations = [
    {
        name: "Lab Block 2",
        type: "Academic Building",
        latitude: 12.86910,
        longitude: 80.22065,
        aliases: ["lab block 2", "lab 2", "laboratory block 2"]
    },

    {
        name: "IT CSE Lab, St Joseph's Institute of Technology",
        type: "Laboratory",
        latitude: 12.86946,
        longitude: 80.22055,
        aliases: [
            "it cse lab",
            "cse lab",
            "computer lab",
            "it lab"
        ]
    },

    {
        name: "Classroom Block",
        type: "Academic Building",
        latitude: 12.86982,
        longitude: 80.21875,
        aliases: [
            "classroom",
            "class rooms",
            "class block"
        ]
    },

    {
        name: "Girls Hostel",
        type: "Hostel",
        latitude: 12.86846,
        longitude: 80.21823,
        aliases: [
            "girls hostel",
            "women hostel",
            "ladies hostel"
        ]
    },

    {
        name: "Mess",
        type: "Food Facility",
        latitude: 12.86899,
        longitude: 80.21847,
        aliases: [
            "mess",
            "food",
            "canteen"
        ]
    },
        {
        name: "Block 1",
        type: "Engineering Block",
        latitude: 12.8689722,
        longitude: 80.2164444,
        aliases: ["block 1", "engineering block 1"]
    },

    {
        name: "Block 2",
        type: "Engineering Block",
        latitude: 12.868993,
        longitude: 80.216134,
        aliases: ["block 2", "engineering block 2"]
    },

    {
        name: "Block 3",
        type: "Engineering Block",
        latitude: 12.86917702208634,
        longitude: 80.2158219537613,
        aliases: ["block 3", "engineering block 3"]
    },

    {
        name: "Block 4",
        type: "Engineering Block",
        latitude: 12.869170317649592,
        longitude: 80.21544884937452,
        aliases: ["block 4", "engineering block 4"]
    },

    {
        name: "Block 5",
        type: "Engineering Block",
        latitude: 12.869271081066314,
        longitude: 80.21522924495005,
        aliases: ["block 5", "engineering block 5"]
    },

    {
        name: "Block 9",
        type: "Engineering Block",
        latitude: 12.870196509827023,
        longitude: 80.21710749571233,
        aliases: ["block 9", "engineering block 9"]
    },

    {
        name: "Auditorium",
        type: "Campus Facility",
        latitude: 12.868306614274475,
        longitude: 80.21615230240107,
        aliases: ["auditorium"]
    },

    {
        name: "Admin Block",
        type: "Administration",
        latitude: 12.86940079190416,
        longitude: 80.21703035092315,
        aliases: ["admin", "admin block", "administration"]
    },

    {
        name: "Bus Bay",
        type: "Transport",
        latitude: 12.87136331009537,
        longitude: 80.2162171802526,
        aliases: ["bus bay", "bus stop"]
    },

    {
        name: "Trinity",
        type: "Campus Facility",
        latitude: 12.871568270572848,
        longitude: 80.21558995598852,
        aliases: ["trinity"]
    },

    {
        name: "Boys Mess",
        type: "Food Facility",
        latitude: 12.868308846921508,
        longitude: 80.21508572068402,
        aliases: ["boys mess"]
    },

    {
        name: "Girls Veg Mess",
        type: "Food Facility",
        latitude: 12.868975095786467,
        longitude: 80.2150147009935,
        aliases: ["girls veg mess", "girls mess"]
    },
];


// ============================================================
// NORMALIZE SEARCH TEXT
// ============================================================

function normalize(text) {

    return text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");

}


// ============================================================
// SEARCH CAMPUS LOCATIONS
// ============================================================

function searchLocation(query) {

    const searchText = normalize(query);

    // Empty search
    if (!searchText) {
        return [];
    }

    return locations.filter(function (location) {

        const name =
            normalize(location.name);

        const type =
            normalize(location.type);

        const aliases =
            location.aliases.map(normalize);

        // Search name
        if (name.includes(searchText)) {
            return true;
        }

        // Search type
        if (type.includes(searchText)) {
            return true;
        }

        // Search aliases
        return aliases.some(function (alias) {

            return alias.includes(searchText);

        });

    });

}


// ============================================================
// FIND ONE LOCATION BY NAME
// ============================================================

function findLocation(name) {

    const searchText =
        normalize(name);

    return locations.find(function (location) {

        return (
            normalize(location.name) === searchText ||
            location.aliases
                .map(normalize)
                .includes(searchText)
        );

    });

}


// ============================================================
// GET ALL LOCATIONS
// ============================================================

function getAllLocations() {

    return locations;

}


// ============================================================
// EXPORT MODULE
// ============================================================

module.exports = {

    locations,
    searchLocation,
    findLocation,
    getAllLocations

};