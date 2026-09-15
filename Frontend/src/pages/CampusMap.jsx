import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./CampusMap.css";


// Custom icons
const templeIcon = L.divIcon({
  className: "custom-marker",
  html: "🛕",
  iconSize: [35, 35],
  iconAnchor: [17, 35]
});

const masjidIcon = L.divIcon({
  className: "custom-marker",
  html: "☪",
  iconSize: [35, 35],
  iconAnchor: [17, 35]
});

const chapelIcon = L.divIcon({
  className: "custom-marker",
  html: "✝",
  iconSize: [35, 35],
  iconAnchor: [17, 35]
});


// Religious locations
const religiousLocations = [
  {
    name: "Temple",
    latitude: 12.86970680374666,
    longitude: 80.21772332476603,
    icon: templeIcon
  },
  {
    name: "Masjid",
    latitude: 12.86942037676652,
    longitude: 80.21779781117817,
    icon: masjidIcon
  },
  {
    name: "Chapel",
    latitude: 12.869565607388884,
    longitude: 80.21773987730205,
    icon: chapelIcon
  }
];


function CampusMap() {

  const [campusData, setCampusData] = useState(null);

  // Load GeoJSON
  useEffect(() => {

    fetch("/map/campus-only.geojson")
      .then(response => response.json())
      .then(data => {
        setCampusData(data);
      })
      .catch(error => {
        console.error("Error loading campus map:", error);
      });

  }, []);


  // Building styles
  const campusStyle = (feature) => {

    const name =
      feature.properties?.name?.toLowerCase() || "";

    // College boundary
    if (
      name.includes("st joseph's institute of technology") ||
      name.includes("st. joseph's college of engineering")
    ) {
      return {
        color: "#173B63",
        weight: 3,
        fillOpacity: 0.04
      };
    }

    // Hostel
    if (name.includes("hostel")) {
      return {
        color: "#2E7D32",
        weight: 2,
        fillOpacity: 0.25
      };
    }

    // Mess
    if (name.includes("mess")) {
      return {
        color: "#EF6C00",
        weight: 2,
        fillOpacity: 0.25
      };
    }

    // Academic buildings
    return {
      color: "#1565C0",
      weight: 2,
      fillOpacity: 0.18
    };
  };


  // Building popup
  const onEachFeature = (feature, layer) => {

    const properties = feature.properties || {};

    let popup = `
      <b>${properties.name || "Campus Location"}</b>
    `;

    if (properties.amenity) {
      popup += `<br>Amenity: ${properties.amenity}`;
    }

    if (properties.start_date) {
      popup += `<br>Established: ${properties.start_date}`;
    }

    layer.bindPopup(popup);
  };


  return (

    <section className="campus-map">

      <div className="map-header">

        <p className="small-title">
          CAMPUS MAP
        </p>

        <h1>
          Explore Our Campus
        </h1>

        <p>
          Find buildings, departments, laboratories,
          facilities and other important locations.
        </p>

      </div>


      <div className="map-container">

        {/* Search box - navigation/search logic can be added later */}

        <div className="search-box">

          <input
            type="text"
            placeholder="Search building or location..."
          />

          <button>
            Search
          </button>

        </div>


        <div className="map-area">

          <MapContainer
            center={[12.869, 80.219]}
            zoom={17}
            scrollWheelZoom={true}
            style={{
              height: "100%",
              width: "100%"
            }}
          >

            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            {/* Campus buildings and boundaries */}

            {campusData && (

              <GeoJSON
                data={campusData}
                style={campusStyle}
                onEachFeature={onEachFeature}
              />

            )}


            {/* Temple / Masjid / Chapel */}

            {religiousLocations.map(location => (

              <Marker
                key={location.name}
                position={[
                  location.latitude,
                  location.longitude
                ]}
                icon={location.icon}
              >

                <Popup>
                  <b>{location.name}</b>
                </Popup>

              </Marker>

            ))}

          </MapContainer>

        </div>

      </div>

    </section>

  );
}


export default CampusMap;