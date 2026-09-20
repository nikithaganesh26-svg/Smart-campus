import { useState } from "react";
import "./about.css";

function About() {
  const [selectedCollege, setSelectedCollege] = useState(
    "Engineering Campus"
  );

  const [searchText, setSearchText] = useState("");

  const buildings = [
    {
      icon: "📚",
      name: "Library Block",
      details: [
        "First Floor – Central Library",
        "First Floor – Audio Visual Hall",
        "Ground Floor – Drawing Hall I",
        "Ground Floor – Drawing Hall II",
        "Ground Floor – Drawing Hall III",
        "Ground Floor – Drawing Hall IV",
      ],
    },
    {
      icon: "🧪",
      name: "Lab Block I",
      details: [
        "Second Floor – CSE Lab II",
        "Second Floor – Internet Server",
        "First Floor – CSE Lab I",
        "First Floor – Media Laboratory / Studio",
        "Ground Floor – Machine Shop",
      ],
    },
    {
      icon: "🔬",
      name: "Lab Block II",
      details: [
        "Second Floor – Measurement & Instrumentation Lab",
        "First Floor – Electronic Devices Simulations Lab",
        "Ground Floor – Power System Simulation Lab",
        "Ground Floor – Electrical Machine Lab",
      ],
    },
    {
      icon: "⚙️",
      name: "Lab Block III",
      details: [
        "Second Floor – Process Control Lab",
        "Second Floor – Computer Center",
        "Ground Floor – Strength of Materials Lab",
        "Ground Floor – Fluid Mechanics & Machinery Lab",
      ],
    },
    {
      icon: "🛠️",
      name: "Lab Block IV",
      details: [
        "Second Floor – Metrology Lab",
        "First Floor – Mechatronics Lab",
        "Ground Floor – Chemical Engineering Lab",
        "Ground Floor – Mechanical Operations Lab",
      ],
    },
    {
      icon: "🏫",
      name: "Classroom Block VIII",
      details: [
        "Ground Floor – Rooms 47–52: ECE A, ECE B, ECE C, ECE D, ECE E, ECE F",
        "Ground Floor – Room 53: CYS A",
        "Ground Floor – Room 54: Physics Staff Room",
        "First Floor – Room 55: Lab",
        "First Floor – Room 56: CYS B",
        "First Floor – Room 57: AML A",
        "First Floor – Room 58: AML B",
        "First Floor – Room 59: CSE AML",
        "First Floor – Room 60: ADS A",
        "Second Floor – Room 61: Physics Staff Room",
        "Second Floor – Room 62: Physics HOD Room",
        "Second Floor – Room 63: ADS B",
        "Second Floor – Room 64: ADS C",
        "Second Floor – Room 65: ADS D",
        "Second Floor – Room 66: ADS E",
        "Second Floor – Room 67: ADS G",
        "Second Floor – Room 68: ADS H",
      ],
    },
    {
      icon: "🏢",
      name: "Conference Halls",
      details: ["Conference Hall facilities available on campus"],
    },
    {
      icon: "💼",
      name: "Placement Block",
      details: ["Placement Office"],
    },
    {
      icon: "📝",
      name: "Exam Block",
      details: ["Examination facilities available on campus"],
    },
  ];

  // Search buildings and their class/room/facility details
const filteredBuildings = buildings.filter((building) => {
  const search = searchText.toLowerCase().trim();

  if (!search) {
    return true;
  }

  const buildingName = building.name.toLowerCase();
  const allDetails = building.details.join(" ").toLowerCase();

  // Direct search
  if (
    buildingName.includes(search) ||
    allDetails.includes(search)
  ) {
    return true;
  }

  // Remove common search words
  const cleanedSearch = search
    .replace(/\bblock\b/g, "")
    .replace(/\broom\b/g, "")
    .replace(/\bclass\b/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleanedSearch) {
    return false;
  }

  return (
    buildingName.includes(cleanedSearch) ||
    allDetails.includes(cleanedSearch)
  );
});
  return (
    <div className="about-page">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="about-hero">
        <p>SMART CAMPUS</p>

        <h1>About Smart Campus</h1>

        <span>
          Making Campus Navigation Simple, Smart and Accessible
        </span>
      </section>


      {/* =====================================================
          COLLEGE
      ===================================================== */}
      <section className="campus-section">
        <p className="section-label">OUR COLLEGE</p>

        <h2>St. Joseph's College of Engineering</h2>

        <p className="campus-subtitle">
          Engineering Campus
        </p>
      </section>


      {/* =====================================================
          SEARCH
      ===================================================== */}
      <section className="campus-search-section">

        <p className="section-label">CAMPUS DIRECTORY</p>

        <h2>Find a Block or Class</h2>

        <div className="campus-search-container">

          {/* COLLEGE SELECTOR */}
          <div className="search-field">

            <label htmlFor="college">
              College
            </label>

           <select
  id="college"
  value={selectedCollege}
  onChange={(e) => setSelectedCollege(e.target.value)}
>
  <option value="Engineering Campus">
    Engineering Campus
  </option>

  <option value="Technology Campus">
    Technology Campus
  </option>
</select>

          </div>


          {/* BLOCK / CLASS SEARCH */}
          <div className="search-field search-input-field">

            <label htmlFor="blockSearch">
              Search Block / Class
            </label>

            <input
              id="blockSearch"
              type="text"
              placeholder="Search block, room, class or facility..."
              value={searchText}
              onChange={(e) =>
                setSearchText(e.target.value)
              }
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          BUILDING DETAILS
      ===================================================== */}
      <section className="building-section">

        <p className="section-label">
          ENGINEERING CAMPUS
        </p>

        <h2>Building &amp; Floor Details</h2>

        <p className="building-intro">
          Explore the blocks, classrooms, laboratories and
          facilities available at St. Joseph's College of Engineering.
        </p>


        {/* SEARCH RESULT COUNT */}
        {searchText && (
          <p className="search-result-text">
            Showing {filteredBuildings.length} matching building
            {filteredBuildings.length !== 1 ? "s" : ""}
          </p>
        )}


        <div className="building-grid">

          {filteredBuildings.length > 0 ? (

            filteredBuildings.map((building, index) => (

              <div
                className="building-card"
                key={index}
              >

                <div className="building-icon">
                  {building.icon}
                </div>

                <h3>{building.name}</h3>

                <ul>

                  {building.details.map(
                    (detail, detailIndex) => (

                      <li key={detailIndex}>
                        {detail}
                      </li>

                    )
                  )}

                </ul>

              </div>

            ))

          ) : (

            <div className="no-results">

              <div className="no-results-icon">
                🔍
              </div>

              <h3>No matching location found</h3>

              <p>
                Try searching for a block, room, class or facility.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          ACADEMIC PROGRAMMES
      ===================================================== */}
      <section className="details-section">

        <p className="section-label">
          ACADEMIC PROGRAMMES
        </p>

        <h2>
          School of Computer Science and Engineering
        </h2>


        <div className="programme-grid">

          <div className="programme-card">
            <span>💻</span>
            <h3>
              Computer Science and Engineering
            </h3>
          </div>


          <div className="programme-card">
            <span>🤖</span>
            <h3>
              Artificial Intelligence and Data Science
            </h3>
          </div>


          <div className="programme-card">
            <span>🧠</span>
            <h3>
              Artificial Intelligence and Machine Learning
            </h3>
          </div>


          <div className="programme-card">
            <span>🔐</span>
            <h3>
              Computer Science and Engineering
              (Cyber Security)
            </h3>
          </div>

        </div>

      </section>


      {/* =====================================================
          DEPARTMENTS
      ===================================================== */}
      <section className="details-section">

        <p className="section-label">
          DEPARTMENTS
        </p>

        <h2>Academic Departments</h2>


        <div className="department-grid">

          <div className="department-card">

            <h3>
              Information Technology
            </h3>

            <p>
              Department of Information Technology
            </p>

          </div>


          <div className="department-card">

            <h3>
              Electronics &amp; Communication Engineering
            </h3>

            <p>
              Department of Electronics and Communication
              Engineering
            </p>

          </div>


          <div className="department-card">

            <h3>
              Bio Technology
            </h3>

            <p>
              Department of Bio Technology
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          SMART CAMPUS FEATURES — MOVED TO BOTTOM
      ===================================================== */}
      <section className="about-content">

        <div className="about-card">

          <div className="about-icon">
            🗺️
          </div>

          <h2>
            Interactive Campus Map
          </h2>

          <p>
            Explore the campus through an interactive map
            that helps students, parents, faculty and visitors
            easily find important locations.
          </p>

        </div>


        <div className="about-card">

          <div className="about-icon">
            🔎
          </div>

          <h2>
            Easy Location Search
          </h2>

          <p>
            Search for buildings, departments, laboratories,
            offices and other important facilities within
            the campus.
          </p>

        </div>


        <div className="about-card">

          <div className="about-icon">
            📍
          </div>

          <h2>
            Smart Navigation
          </h2>

          <p>
            Find your current location and explore pedestrian
            routes to different places inside the campus.
          </p>

        </div>

      </section>


      {/* =====================================================
          OUR GOAL — BOTTOM
      ===================================================== */}
      <section className="about-goal">

        <div>

          <p className="section-label">
            OUR GOAL
          </p>

          <h2>
            Making Campus Exploration Easier
          </h2>

          <p className="goal-text">
            Smart Campus is a web-based campus navigation
            system designed to make campus exploration simple
            and convenient.
          </p>

          <p className="goal-text">
            It provides useful information about campus
            buildings, departments, laboratories and
            facilities through an easy-to-use interface.
          </p>

        </div>


        <div className="goal-box">

          <span>SMART</span>

          <h3>Explore</h3>
          <h3>Search</h3>
          <h3>Navigate</h3>

        </div>

      </section>

    </div>
  );
}

export default About;