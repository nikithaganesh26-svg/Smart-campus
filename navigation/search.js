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
    }
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