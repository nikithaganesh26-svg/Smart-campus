const fs = require("fs");
const osmtogeojson = require("osmtogeojson");
const { DOMParser } = require("@xmldom/xmldom");

// Read OSM file
const osmData = fs.readFileSync("map.osm", "utf8");

// Convert OSM XML to GeoJSON
const osmXml = new DOMParser().parseFromString(osmData, "text/xml");
const geojson = osmtogeojson(osmXml);

// Find your college boundary
const campusBoundary = geojson.features.find(
    feature =>
        feature.properties?.name === "St Joseph's Institute of Technology"
);

if (!campusBoundary) {
    console.log("College boundary not found!");
    process.exit();
}

// Get the boundary coordinates
const boundary = campusBoundary.geometry.coordinates[0];

// Check whether a point is inside the college boundary
function isInside(point, polygon) {
    const [x, y] = point;
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
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

// Find a representative point for each feature
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

    const x = coords.reduce((sum, p) => sum + p[0], 0) / coords.length;
    const y = coords.reduce((sum, p) => sum + p[1], 0) / coords.length;

    return [x, y];
}

// Keep only features inside your college
const filteredFeatures = geojson.features.filter(feature => {
    if (!feature.geometry) return false;

    // Always keep the college boundary
    if (
        feature.properties?.name ===
        "St Joseph's Institute of Technology"
    ) {
        return true;
    }

    const center = getCenter(feature);

    return isInside(center, boundary);
});

// Create filtered GeoJSON
const filteredGeoJSON = {
    type: "FeatureCollection",
    features: filteredFeatures
};

// Save it
fs.writeFileSync(
    "campus-only.geojson",
    JSON.stringify(filteredGeoJSON, null, 2)
);

console.log("Your college campus map created successfully!");
console.log("Features kept:", filteredFeatures.length);