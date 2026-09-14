const fs = require("fs");
const osmtogeojson = require("osmtogeojson");
const { DOMParser } = require("@xmldom/xmldom");

const osmData = fs.readFileSync("map.osm", "utf8");
const osmXml = new DOMParser().parseFromString(osmData, "text/xml");
const geojson = osmtogeojson(osmXml);

// Find both college boundaries
const sjitBoundary = geojson.features.find(
    feature =>
        feature.properties?.name ===
        "St Joseph's Institute of Technology"
);

const engineeringBoundary = geojson.features.find(
    feature =>
        feature.properties?.name ===
        "St. Joseph's College of Engineering"
);

if (!sjitBoundary) {
    console.log("SJIT boundary not found!");
    process.exit();
}

if (!engineeringBoundary) {
    console.log("Engineering College boundary not found!");
    process.exit();
}

// Get polygon coordinates
const sjitPolygon = sjitBoundary.geometry.coordinates[0];
const engineeringPolygon = engineeringBoundary.geometry.coordinates[0];

function isInside(point, polygon) {
    const [x, y] = point;
    let inside = false;

    for (
        let i = 0, j = polygon.length - 1;
        i < polygon.length;
        j = i++
    ) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];

        const intersect =
            ((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

        if (intersect) {
            inside = !inside;
        }
    }

    return inside;
}

function getCenter(feature) {
    const coords = [];

    function collect(points) {
        if (typeof points[0] === "number") {
            coords.push(points);
        } else {
            points.forEach(collect);
        }
    }

    collect(feature.geometry.coordinates);

    const x =
        coords.reduce((sum, p) => sum + p[0], 0) /
        coords.length;

    const y =
        coords.reduce((sum, p) => sum + p[1], 0) /
        coords.length;

    return [x, y];
}

// Colleges that we DON'T want
const unwanted = [
    "Sathyabama Institute of Science and Technology",
    "Jeppiaar Engineering College"
];

const filteredFeatures = geojson.features.filter(feature => {
    if (!feature.geometry) return false;

    const name = feature.properties?.name;

    // Remove unrelated nearby colleges
    if (unwanted.includes(name)) {
        return false;
    }

    // Always keep both main college boundaries
    if (
        name === "St Joseph's Institute of Technology" ||
        name === "St. Joseph's College of Engineering"
    ) {
        return true;
    }

    // Find the center of the feature
    const center = getCenter(feature);

    // Keep buildings/features inside either college boundary
    return (
        isInside(center, sjitPolygon) ||
        isInside(center, engineeringPolygon)
    );
});

const filteredGeoJSON = {
    type: "FeatureCollection",
    features: filteredFeatures
};

fs.writeFileSync(
    "campus-only.geojson",
    JSON.stringify(filteredGeoJSON, null, 2)
);

console.log("Combined St. Joseph's campus map created!");
console.log("Features kept:", filteredFeatures.length);