import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  useMap,
  Polyline,
  Tooltip,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./CampusMap.css";


/* ============================= */
/* MAP CENTER */
/* ============================= */

const defaultCenter = [12.8696, 80.2177];

/* ============================= */
/* VERIFIED ENGINEERING LOCATIONS */
/* ============================= */

const engineeringLocations = [
  {
    name: "Block 1",
    latitude: 12.8689722,
    longitude: 80.2164444,
    category: "Academic",
    campus: "engineering",
  },
  {
    name: "Block 2",
    latitude: 12.868993,
    longitude: 80.216134,
    category: "Academic",
    campus: "engineering",
  },
  {
    name: "Block 3",
    latitude: 12.86917702208634,
    longitude: 80.2158219537613,
    category: "Academic",
    campus: "engineering",
  },
  {
    name: "Block 4",
    latitude: 12.869170317649592,
    longitude: 80.21544884937452,
    category: "Academic",
    campus: "engineering",
  },
  {
    name: "Block 5",
    latitude: 12.869271081066314,
    longitude: 80.21522924495005,
    category: "Academic",
    campus: "engineering",
  },
  {
    name: "Block 9",
    latitude: 12.870196509827023,
    longitude: 80.21710749571233,
    category: "Academic",
    campus: "engineering",
  },
  {
    name: "Auditorium",
    latitude: 12.868306614274475,
    longitude: 80.21615230240107,
    category: "Facilities",
    campus: "engineering",
  },
  {
    name: "Admin Block",
    latitude: 12.86940079190416,
    longitude: 80.21703035092315,
    category: "Administration",
    campus: "engineering",
  },
  {
    name: "Bus Bay",
    latitude: 12.87136331009537,
    longitude: 80.2162171802526,
    category: "Transport",
    campus: "engineering",
  },
  {
    name: "Trinity",
    latitude: 12.871568270572848,
    longitude: 80.21558995598852,
    category: "Facilities",
    campus: "engineering",
  },
  {
    name: "Boys Mess",
    latitude: 12.868308846921508,
    longitude: 80.21508572068402,
    category: "Facilities",
    campus: "engineering",
  },
  {
    name: "Girls Veg Mess",
    latitude: 12.868975095786467,
    longitude: 80.2150147009935,
    category: "Facilities",
    campus: "engineering",
  },
];



/* ============================= */
/* CATEGORIES */
/* ============================= */

const categories = [
  { name: "All", icon: "📍" },
  { name: "Academic", icon: "📚" },
  { name: "Labs", icon: "🔬" },
  { name: "Hostel", icon: "🏠" },
  { name: "Facilities", icon: "🍴" },
  { name: "Transport", icon: "🚌" },
  { name: "Administration", icon: "🏢" },
];


/* ============================= */
/* CATEGORY DETECTION */
/* ============================= */

function getCategory(location) {

  const name = location.name.toLowerCase();

  if (
    name.includes("lab") ||
    name.includes("laboratory")
  ) {
    return "Labs";
  }

  if (
    name.includes("hostel") ||
    name.includes("residence")
  ) {
    return "Hostel";
  }

  if (
    name.includes("bus") ||
    name.includes("transport") ||
    name.includes("parking")
  ) {
    return "Transport";
  }

  if (
    name.includes("canteen") ||
    name.includes("food") ||
    name.includes("cafeteria") ||
    name.includes("mess")
  ) {
    return "Facilities";
  }

  if (
    name.includes("office") ||
    name.includes("administration") ||
    name.includes("admin")
  ) {
    return "Administration";
  }

  return "Academic";
}


/* ============================= */
/* CATEGORY ICON */
/* ============================= */

function getCategoryIcon(category) {

  const found = categories.find(
    (item) => item.name === category
  );

  return found ? found.icon : "📍";
}


/* ============================= */
/* MARKER ICON */
/* ============================= */

function createMarkerIcon(category) {

  const icon = getCategoryIcon(category);

  return L.divIcon({

    className: "custom-marker",

    html: `
      <div class="marker-icon">
        ${icon}
      </div>
    `,

    iconSize: [44, 44],

    iconAnchor: [22, 44],

  });
}


/* ============================= */
/* USER LOCATION ICON */
/* ============================= */

function createUserIcon() {

  return L.divIcon({

    className: "user-marker",

    html: `
      <div class="user-location-marker">
        📍
      </div>
    `,

    iconSize: [42, 42],

    iconAnchor: [21, 42],

  });
}


/* ============================= */
/* DISTANCE */
/* ============================= */

function calculateDistance(
  lat1,
  lon1,
  lat2,
  lon2
) {

  const earthRadius = 6371000;

  const lat1Rad =
    (lat1 * Math.PI) / 180;

  const lat2Rad =
    (lat2 * Math.PI) / 180;

  const differenceLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const differenceLon =
    ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(differenceLat / 2) *
      Math.sin(differenceLat / 2) +

    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *

      Math.sin(differenceLon / 2) *
      Math.sin(differenceLon / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return earthRadius * c;
}


/* ============================= */
/* DISTANCE TEXT */
/* ============================= */

function getDistanceText(distance) {

  if (distance < 1000) {

    return `${Math.round(distance)} m`;

  }

  return `${(distance / 1000).toFixed(2)} km`;
}


/* ============================= */
/* MAP CONTROLLER */
/* ============================= */

function MapController({
  selectedLocation,
  campus
}) {

  const map = useMap();

  useEffect(() => {
    if (campus === "engineering") {
      map.flyTo([12.8694, 80.2162], 17, {
        duration: 1.2,
      });
    } else {
      map.flyTo([12.8696, 80.2177], 17, {
        duration: 1.2,
      });
    }
  }, [campus, map]);

  useEffect(() => {

    if (selectedLocation) {

      map.flyTo(

        [
          selectedLocation.latitude,
          selectedLocation.longitude,
        ],

        18,

        {
          duration: 1.2,
        }

      );

    }

  }, [selectedLocation, map]);

  return null;
}


/* ============================= */
/* MAIN COMPONENT */
/* ============================= */

function CampusMap() {

  const [locations, setLocations] =
    useState([]);

  const [selectedLocation, setSelectedLocation] =
    useState(null);

  const [searchText, setSearchText] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

 const params = new URLSearchParams(window.location.search);

const [campus, setCampus] = useState(
  params.get("campus") === "engineering"
    ? "engineering"
    : "technology"
);

  const [userLocation, setUserLocation] =
    useState(null);

  const [nearestLocation, setNearestLocation] =
    useState(null);

  const [locationLoading, setLocationLoading] =
    useState(false);

  const [locationError, setLocationError] =
    useState("");

  const [showRoute, setShowRoute] =
    useState(false);

  const [geoData, setGeoData] =
    useState(null);


  /* ============================= */
  /* LOAD GEOJSON */
  /* ============================= */

  useEffect(() => {

    fetch("/map/campus-only.geojson")

      .then((response) =>
        response.json()
      )

      .then((data) => {

        setGeoData(data);

      })

      .catch((error) => {

        console.error(
          "Error loading GeoJSON:",
          error
        );

      });

  }, []);


  /* ============================= */
  /* EXTRACT LOCATIONS */
  /* ============================= */

  useEffect(() => {

    if (!geoData) return;

    const extractedLocations = [];


    geoData.features.forEach(
      (feature) => {

        if (
          feature.properties &&
          feature.properties.name &&
          feature.geometry
        ) {

          let latitude = null;

          let longitude = null;


          /* POINT */

          if (
            feature.geometry.type ===
            "Point"
          ) {

            longitude =
              feature.geometry.coordinates[0];

            latitude =
              feature.geometry.coordinates[1];

          }


          /* POLYGON */

          if (
            feature.geometry.type ===
            "Polygon"
          ) {

            const coordinates =
              feature.geometry.coordinates[0];

            let totalLat = 0;

            let totalLon = 0;


            coordinates.forEach(
              (coordinate) => {

                totalLon += coordinate[0];

                totalLat += coordinate[1];

              }
            );


            longitude =
              totalLon /
              coordinates.length;

            latitude =
              totalLat /
              coordinates.length;

          }


          if (
            latitude !== null &&
            longitude !== null
          ) {

            extractedLocations.push({

              name:
                feature.properties.name,

              latitude,

              longitude,

              category:
                getCategory({

                  name:
                    feature.properties.name,

                }),

            });

          }

        }

      }
    );


    setLocations(
      extractedLocations
    );

  }, [geoData]);


  /* ============================= */
  /* FILTER LOCATIONS */
  /* ============================= */

  /* ============================= */
  /* CAMPUS LOCATIONS */
  /* ============================= */

  const campusLocations =
    campus === "engineering"
      ? engineeringLocations
      : locations;


  /* ============================= */
  /* FILTER LOCATIONS */
  /* ============================= */

  const filteredLocations =
    campusLocations.filter(
      (location) => {

        const matchesSearch =
          location.name
            .toLowerCase()
            .includes(
              searchText.toLowerCase()
            );


        const matchesCategory =
          selectedCategory === "All" ||
          location.category ===
            selectedCategory;


        return (
          matchesSearch &&
          matchesCategory
        );

      }
    );


  /* ============================= */
  /* SELECT LOCATION */
  /* ============================= */

  const selectLocation = (
    location
  ) => {

    setSelectedLocation(
      location
    );

    setShowRoute(false);

  };


  /* ============================= */
  /* FIND NEAREST */
/* ============================= */

  const findNearest = () => {

    setLocationLoading(true);

    setLocationError("");

    setNearestLocation(null);

    setShowRoute(false);


    if (!navigator.geolocation) {

      setLocationError(
        "Your browser does not support location."
      );

      setLocationLoading(false);

      return;

    }


    navigator.geolocation.getCurrentPosition(

      (position) => {

        const currentLatitude =
          position.coords.latitude;

        const currentLongitude =
          position.coords.longitude;


        const currentUserLocation = {

          latitude:
            currentLatitude,

          longitude:
            currentLongitude,

        };


        setUserLocation(
          currentUserLocation
        );


        let nearest = null;

        let shortestDistance =
          Infinity;


        campusLocations.forEach(
          (location) => {

            const distance =
              calculateDistance(

                currentLatitude,

                currentLongitude,

                location.latitude,

                location.longitude

              );


            if (
              distance <
              shortestDistance
            ) {

              shortestDistance =
                distance;


              nearest = {

                ...location,

                distance,

              };

            }

          }
        );


        if (nearest) {

          setNearestLocation(
            nearest
          );

          setSelectedLocation(
            nearest
          );

        }


        setLocationLoading(false);

      },


      (error) => {

        console.error(error);

        setLocationError(
          "Unable to get your location. Please allow location permission."
        );

        setLocationLoading(false);

      }

    );

  };


  /* ============================= */
  /* SHOW ROUTE */
  /* ============================= */

  const handleShowRoute = () => {

    if (!userLocation) {

      setLocationError(
        "First click Find Nearest to get your current location."
      );

      return;

    }


    if (!selectedLocation) {

      setLocationError(
        "Please select a building first."
      );

      return;

    }


    setLocationError("");

    setShowRoute(true);

  };


  /* ============================= */
  /* GOOGLE DIRECTIONS */
  /* ============================= */

  const openDirections = () => {

    if (!selectedLocation) return;


    const url =
      `https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.latitude},${selectedLocation.longitude}`;


    window.open(
      url,
      "_blank"
    );

  };


  return (

    <div className="campus-map-page">


      {/* ============================= */}
      {/* HEADER */}
      {/* ============================= */}

      <div className="map-header">

        <div>

          <p className="map-small-title">
            SMART CAMPUS
          </p>

          <h1>
            Campus Map
          </h1>

          <p>
            Find buildings, facilities and
            important locations around the campus.
          </p>

        </div>


        <div className="campus-selector">

          <label>
            Select Campus
          </label>


          <select

            value={campus}

            onChange={(event) => {

              setCampus(
                event.target.value
              );

              setSelectedLocation(
                null
              );

              setNearestLocation(
                null
              );

              setShowRoute(
                false
              );

            }}

          >

            <option value="technology">

              St. Joseph's Institute of Technology

            </option>


            <option value="engineering">

              St. Joseph's College of Engineering

            </option>

          </select>

        </div>

      </div>


      {/* ============================= */}
      {/* MAP LAYOUT */}
      {/* ============================= */}

      <div className="map-layout">


        {/* ============================= */}
        {/* SIDEBAR */}
        {/* ============================= */}

        <div className="map-sidebar">


          {/* SEARCH */}

          <div className="search-section">

            <h3>
              🔎 Search Location
            </h3>


            <div className="search-box">

              <input

                type="text"

                placeholder="Search building..."

                value={searchText}

                onChange={(event) =>
                  setSearchText(
                    event.target.value
                  )
                }

              />


              <button>
                🔍
              </button>

            </div>

          </div>


          {/* FIND NEAREST */}

          <div className="nearest-section">

            <button

              className="nearest-button"

              onClick={findNearest}

              disabled={
                locationLoading
              }

            >

              {locationLoading
                ? "📍 Finding..."
                : "📍 Find Nearest"}

            </button>


            {locationError && (

              <p className="location-error">

                ⚠️ {locationError}

              </p>

            )}


            {nearestLocation && (

              <div className="nearest-result">

                <div className="nearest-result-icon">

                  {getCategoryIcon(
                    nearestLocation.category
                  )}

                </div>


                <div>

                  <small>
                    NEAREST LOCATION
                  </small>


                  <h4>
                    {nearestLocation.name}
                  </h4>


                  <p>
                    {nearestLocation.category}
                  </p>


                  <strong>

                    📏{" "}

                    {getDistanceText(
                      nearestLocation.distance
                    )}

                  </strong>

                </div>

              </div>

            )}

          </div>


          {/* SHOW ROUTE */}

          <div className="route-section">

            <button

              className="route-button"

              onClick={
                handleShowRoute
              }

            >

              🛣️ Show Route

            </button>


            {showRoute && (

              <p className="route-message">

                🛣️ Route displayed from
                your location to the
                selected building.

              </p>

            )}

          </div>


          {/* CATEGORIES */}

          <div className="category-section">

            <h3>
              📂 Categories
            </h3>


            <div className="category-buttons">

              {categories.map(
                (category) => (

                  <button

                    key={
                      category.name
                    }

                    className={`category-button ${
                      selectedCategory ===
                      category.name
                        ? "active"
                        : ""
                    }`}

                    onClick={() =>
                      setSelectedCategory(
                        category.name
                      )
                    }

                  >

                    <span>
                      {category.icon}
                    </span>

                    {category.name}

                  </button>

                )
              )}

            </div>

          </div>


          {/* LOCATIONS */}

          <div className="location-section">

            <div className="location-title">

              <h3>
                📍 Locations
              </h3>


              <span>
                {
                  filteredLocations.length
                }
              </span>

            </div>


            <div className="location-list">

              {filteredLocations.map(
                (location, index) => (

                  <button

                    key={
                      `${location.name}-${index}`
                    }

                    className={`location-item ${
                      selectedLocation?.name ===
                      location.name
                        ? "selected"
                        : ""
                    }`}

                    onClick={() =>
                      selectLocation(
                        location
                      )
                    }

                  >

                    <div className="location-item-icon">

                      {getCategoryIcon(
                        location.category
                      )}

                    </div>


                    <div className="location-item-content">

                      <strong>
                        {location.name}
                      </strong>

                      <small>
                        {location.category}
                      </small>

                    </div>

                  </button>

                )
              )}


              {filteredLocations.length ===
                0 && (

                <div className="no-results">

                  <div>
                    🔍
                  </div>

                  <p>
                    No locations found
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>


        {/* ============================= */}
        {/* MAP */}
        {/* ============================= */}

        <div className="map-area">

          <MapContainer

            center={defaultCenter}

            zoom={17}

            className="leaflet-map"

          >

            <TileLayer

              attribution='&copy; OpenStreetMap contributors'

              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

            />


            <MapController
              selectedLocation={selectedLocation}
              campus={campus}
            />


            {/* GEOJSON */}

            {geoData && campus === "technology" && (

              <GeoJSON

                data={geoData}

                style={() => ({

                  color: "#2563eb",

                  weight: 1,

                  fillOpacity: 0.08,

                })}

              />

            )}


            {/* BUILDING MARKERS */}

            {filteredLocations.map(
              (location, index) => (

                <Marker

                  key={
                    `${location.name}-${index}`
                  }

                  position={[
                    location.latitude,
                    location.longitude,
                  ]}

                  icon={createMarkerIcon(
                    location.category
                  )}

                  eventHandlers={{

                    click: () =>
                      selectLocation(
                        location
                      ),

                  }}

                >
                  <Tooltip
                  permanent
                 direction="top"
                 offset={[0, -38]}
                opacity={1}
                className="building-label"
>
  {location.name}
</Tooltip>

                  <Popup>

                    <div className="marker-popup">

                      <div className="popup-icon">

                        {getCategoryIcon(
                          location.category
                        )}

                      </div>


                      <h3>
                        {location.name}
                      </h3>


                      <p>
                        {location.category}
                      </p>


                      <button

                        onClick={() =>
                          selectLocation(
                            location
                          )
                        }

                      >

                        View Details

                      </button>

                    </div>

                  </Popup>

                </Marker>

              )
            )}


            {/* USER LOCATION */}

            {userLocation && (

              <Marker

                position={[
                  userLocation.latitude,
                  userLocation.longitude,
                ]}

                icon={createUserIcon()}

              >

                <Popup>
                  📍 You are here
                </Popup>

              </Marker>

            )}


            {/* ROUTE */}

            {showRoute &&
              userLocation &&
              selectedLocation && (

                <Polyline

                  positions={[

                    [
                      userLocation.latitude,
                      userLocation.longitude,
                    ],

                    [
                      selectedLocation.latitude,
                      selectedLocation.longitude,
                    ],

                  ]}

                  pathOptions={{

                    color: "#2563eb",

                    weight: 5,

                    opacity: 0.8,

                    dashArray: "10, 10",

                  }}

                />

              )}

          </MapContainer>


          {/* MAP LEGEND */}

          <div className="map-legend">

            <h4>
              Map Legend
            </h4>


            <div className="legend-item">
              📚 Academic
            </div>


            <div className="legend-item">
              🔬 Labs
            </div>


            <div className="legend-item">
              🏠 Hostel
            </div>


            <div className="legend-item">
              🍴 Facilities
            </div>


            <div className="legend-item">
              🚌 Transport
            </div>


            <div className="legend-item">
              📍 Your Location
            </div>

          </div>

        </div>

      </div>


      {/* ============================= */}
      {/* BUILDING DETAILS PANEL */}
      {/* ============================= */}

      {selectedLocation && (

        <div className="location-details">


          {/* ICON */}

          <div className="details-icon">

            {getCategoryIcon(
              selectedLocation.category
            )}

          </div>


          {/* CONTENT */}

          <div className="details-content">

            <p>
              LOCATION DETAILS
            </p>


            <h2>
              {selectedLocation.name}
            </h2>


            <span>
              {selectedLocation.category}
            </span>


            {/* COORDINATES */}

            <div className="detail-row">

              <span>
                📍 Coordinates
              </span>

              <strong>
                {selectedLocation.latitude.toFixed(
                  6
                )},{" "}
                {selectedLocation.longitude.toFixed(
                  6
                )}
              </strong>

            </div>


            {/* FACILITY */}

            <div className="detail-row">

              <span>
                🏫 Campus
              </span>

              <strong>
                {campus === "engineering"
                  ? "St. Joseph's College of Engineering"
                  : "St. Joseph's Institute of Technology"}
              </strong>

            </div>


            {/* DISTANCE */}

            {nearestLocation &&
              nearestLocation.name ===
                selectedLocation.name && (

                <div className="detail-row">

                  <span>
                    📏 Distance from you
                  </span>

                  <strong>
                    {getDistanceText(
                      nearestLocation.distance
                    )}
                  </strong>

                </div>

              )}

          </div>


          {/* ACTION BUTTONS */}

          <div className="details-actions">

            <button

              className="route-details-button"

              onClick={
                handleShowRoute
              }

            >

              🛣️ Show Route

            </button>


            <button

              className="directions-button"

              onClick={
                openDirections
              }

            >

              🧭 Get Directions

            </button>

          </div>

        </div>

      )}


      {/* ============================= */}
      {/* INFO CARDS */}
      {/* ============================= */}

      <div className="info-cards">


        <div className="info-card">

          <div className="info-card-icon">
            🔎
          </div>

          <div>

            <h3>
              Search
            </h3>

            <p>
              Quickly search for buildings
              and important campus locations.
            </p>

          </div>

        </div>


        <div className="info-card">

          <div className="info-card-icon">
            📍
          </div>

          <div>

            <h3>
              Find Nearest
            </h3>

            <p>
              Find the nearest campus
              location using your current
              location.
            </p>

          </div>

        </div>


        <div className="info-card">

          <div className="info-card-icon">
            🛣️
          </div>

          <div>

            <h3>
              Navigation
            </h3>

            <p>
              Display a route from your
              location to the selected
              building.
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}


export default CampusMap;