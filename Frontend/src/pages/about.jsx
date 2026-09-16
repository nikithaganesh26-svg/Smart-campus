import "./About.css";

function About() {
  return (
    <div className="about-page">

      {/* HERO SECTION */}

      <section className="about-hero">

        <p>SMART CAMPUS</p>

        <h1>
          About Smart Campus
        </h1>

        <span>
          Making Campus Navigation Simple, Smart and Accessible
        </span>

      </section>


      {/* ABOUT CONTENT */}

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
            Find your current location and explore routes
            to different places inside the campus.
          </p>

        </div>

      </section>


      {/* OUR GOAL */}

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
            system designed to make campus exploration
            simple and convenient.
          </p>

          <p className="goal-text">
            It provides useful information about campus
            buildings, departments, laboratories and
            facilities through an easy-to-use interface.
          </p>

        </div>


        <div className="goal-box">

          <span>SMART</span>

          <h3>
            Explore
          </h3>

          <h3>
            Search
          </h3>

          <h3>
            Navigate
          </h3>

        </div>

      </section>


      {/* CAMPUS */}

      <section className="campus-section">

        <p className="section-label">
          OUR INSTITUTIONS
        </p>

        <h2>
          St. Joseph's Group of Institutions
        </h2>

        <div className="campus-names">

          <div>
            St. Joseph's Institute of Technology
          </div>

          <div>
            St. Joseph's College of Engineering
          </div>

        </div>

      </section>

    </div>
  );
}

export default About;