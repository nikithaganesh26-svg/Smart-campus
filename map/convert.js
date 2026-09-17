const fs = require("fs");
const osmtogeojson = require("osmtogeojson");
const { DOMParser } = require("@xmldom/xmldom");

// Read the OSM file
const osmData = fs.readFileSync("map.osm", "utf8");

// Convert XML to DOM
const osmXml = new DOMParser().parseFromString(osmData, "text/xml");

// Convert OSM to GeoJSON
const geojson = osmtogeojson(osmXml);

// Save the GeoJSON file
fs.writeFileSync(
    "campus.geojson",
    JSON.stringify(geojson, null, 2)
);

console.log("OSM converted successfully!");