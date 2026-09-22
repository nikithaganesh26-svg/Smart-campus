// ============================================================
// SMART CAMPUS - SEARCH MODULE
// Member 3: Search + Navigation
// ============================================================

const locations = [

    // =========================
    // ENGINEERING CAMPUS
    // =========================

    {
        name: "Hackathon Center",
        type: "Campus Facility",
        latitude: 12.869468,
        longitude: 80.216981,
        aliases: ["hackathon center", "hackathon"]
    },

    {
        name: "Block 8",
        type: "Engineering Block",
        latitude: 12.869713,
        longitude: 80.216916,
        aliases: ["block 8", "engineering block 8"]
    },

    {
        name: "Lab Block 1",
        type: "Laboratory",
        latitude: 12.869596,
        longitude: 80.216633,
        aliases: ["lab block 1", "lab 1", "laboratory block 1"]
    },

    {
        name: "Lab Block 2",
        type: "Laboratory",
        latitude: 12.869672,
        longitude: 80.216202,
        aliases: ["lab block 2", "lab 2", "laboratory block 2"]
    },

    {
        name: "Lab Block 3",
        type: "Laboratory",
        latitude: 12.869603,
        longitude: 80.216195,
        aliases: ["lab block 3", "lab 3", "laboratory block 3"]
    },

    {
        name: "Lab Block 4",
        type: "Laboratory",
        latitude: 12.869664,
        longitude: 80.215922,
        aliases: ["lab block 4", "lab 4", "laboratory block 4"]
    },

    {
        name: "Lab Block 5",
        type: "Laboratory",
        latitude: 12.869683,
        longitude: 80.215827,
        aliases: ["lab block 5", "lab 5", "laboratory block 5"]
    },

    {
        name: "Block 6 MBA Block",
        type: "Academic Building",
        latitude: 12.869823,
        longitude: 80.215412,
        aliases: [
            "block 6",
            "block 6 mba",
            "block 6 mba block",
            "mba block"
        ]
    },

    {
        name: "Central Library",
        type: "Library",
        latitude: 12.869638,
        longitude: 80.215283,
        aliases: ["central library", "library"]
    },

    {
        name: "Classroom Block 5",
        type: "Academic Building",
        latitude: 12.869137,
        longitude: 80.215296,
        aliases: ["classroom block 5", "class block 5"]
    },

    {
        name: "Drawing Hall 1 & 2",
        type: "Academic Building",
        latitude: 12.868905,
        longitude: 80.215257,
        aliases: [
            "drawing hall",
            "drawing hall 1",
            "drawing hall 2",
            "drawing hall 1 and 2"
        ]
    },

    {
        name: "Block 10",
        type: "Engineering Block",
        latitude: 12.868188,
        longitude: 80.216773,
        aliases: ["block 10", "engineering block 10"]
    },

    {
        name: "Class Block 2",
        type: "Academic Building",
        latitude: 12.868989,
        longitude: 80.216205,
        aliases: ["class block 2", "classroom block 2"]
    },

    {
        name: "Classroom Block 3",
        type: "Academic Building",
        latitude: 12.869034,
        longitude: 80.216261,
        aliases: ["classroom block 3", "class block 3"]
    },

    {
        name: "Classroom Block 1",
        type: "Academic Building",
        latitude: 12.868997,
        longitude: 80.216133,
        aliases: ["classroom block 1", "class block 1"]
    },

    {
        name: "Classroom Block 4",
        type: "Academic Building",
        latitude: 12.869174,
        longitude: 80.215595,
        aliases: ["classroom block 4", "class block 4"]
    },

    {
        name: "Block 11",
        type: "Engineering Block",
        latitude: 12.86855800462408,
        longitude: 80.21662553670177,
        aliases: [
            "block 11",
            "block eleven",
            "engineering block 11"
        ]
    },

    {
        name: "Block 12",
        type: "Engineering Block",
        latitude: 12.868359276597346,
        longitude: 80.21662017228408,
        aliases: [
            "block 12",
            "block twelve",
            "engineering block 12"
        ]
    },

    {
        name: "Placement Block",
        type: "Administration",
        latitude: 12.870250,
        longitude: 80.217427,
        aliases: [
            "placement block",
            "placement"
        ]
    },

    {
        name: "Exam Block",
        type: "Administration",
        latitude: 12.870656,
        longitude: 80.216507,
        aliases: [
            "exam block",
            "exam"
        ]
    },

    {
        name: "Engineering Main Gate",
        type: "Entrance",
        latitude: 12.870555363838186,
        longitude: 80.21744436207099,
        aliases: [
            "engineering main gate",
            "engineering gate",
            "main gate"
        ]
    },

    {
        name: "Block 1",
        type: "Engineering Block",
        latitude: 12.8689722,
        longitude: 80.2164444,
        aliases: [
            "block 1",
            "engineering block 1"
        ]
    },

    {
        name: "Block 2",
        type: "Engineering Block",
        latitude: 12.868993,
        longitude: 80.216134,
        aliases: [
            "block 2",
            "engineering block 2"
        ]
    },

    {
        name: "Block 3",
        type: "Engineering Block",
        latitude: 12.86917702208634,
        longitude: 80.2158219537613,
        aliases: [
            "block 3",
            "engineering block 3"
        ]
    },

    {
        name: "Block 4",
        type: "Engineering Block",
        latitude: 12.869170317649592,
        longitude: 80.21544884937452,
        aliases: [
            "block 4",
            "engineering block 4"
        ]
    },

    {
        name: "Block 5",
        type: "Engineering Block",
        latitude: 12.869271081066314,
        longitude: 80.21522924495005,
        aliases: [
            "block 5",
            "engineering block 5"
        ]
    },

    {
        name: "Block 9",
        type: "Engineering Block",
        latitude: 12.870196509827023,
        longitude: 80.21710749571233,
        aliases: [
            "block 9",
            "engineering block 9"
        ]
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
        aliases: [
            "admin",
            "admin block",
            "administration"
        ]
    },

    {
        name: "Bus Bay",
        type: "Transport",
        latitude: 12.87136331009537,
        longitude: 80.2162171802526,
        aliases: [
            "bus bay",
            "bus stop"
        ]
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
        aliases: [
            "girls veg mess",
            "girls mess"
        ]
    },

    // =========================
    // TECHNOLOGY CAMPUS
    // =========================

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

    if (!searchText) {
        return [];
    }

    return locations.filter(function (location) {

        const name = normalize(location.name);

        const type = normalize(location.type);

        const aliases = location.aliases.map(normalize);

        if (name.includes(searchText)) {
            return true;
        }

        if (type.includes(searchText)) {
            return true;
        }

        return aliases.some(function (alias) {
            return alias.includes(searchText);
        });

    });

}


// ============================================================
// FIND ONE LOCATION BY NAME
// ============================================================

function findLocation(name) {

    const searchText = normalize(name);

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