import React from "react";
import "./Home.css";

function Home() {

  return (

    <div className="home-page">

      {/* HERO SECTION */}

      <section className="hero">

        <div className="hero-content">

          <p className="small-title">
            SMART CAMPUS
          </p>

          <h1>
            St. Joseph's
            <br />
            Group of Institutions
          </h1>

          <p className="description">
            Explore our campuses, discover buildings, departments,
            laboratories and important facilities with ease.
          </p>

          <a
            href="/campus-map"
            className="map-button"
          >
            Explore Campus Map →
          </a>

        </div>

      </section>


      {/* CAMPUSES SECTION */}

      <section className="campuses-section">

        <div className="section-heading">

          <p className="small-title">
            OUR CAMPUSES
          </p>

          <h2>
            Choose Your Campus
          </h2>

          <p>
            Explore the facilities and locations available
            across St. Joseph's Group of Institutions.
          </p>

        </div>


        {/* CAMPUS CARDS */}

        <div className="campus-cards">


          {/* CAMPUS 1 */}

          <div className="campus-card">

            <div className="campus-icon">
              🏫
            </div>

            <h3>
              St. Joseph's Institute of Technology
            </h3>

            <p>
              Explore buildings, departments, laboratories,
              facilities and important locations of the
              Institute of Technology campus.
            </p>

            <a href="/campus-map">
              Explore Campus →
            </a>

          </div>


          {/* CAMPUS 2 */}

          <div className="campus-card">

            <div className="campus-icon">
              🎓
            </div>

            <h3>
              St. Joseph's College of Engineering
            </h3>

            <p>
              Discover departments, academic buildings,
              laboratories and other important locations
              around the College of Engineering campus.
            </p>

            <a href="/campus-map">
              Explore Campus →
            </a>

          </div>

        </div>

      </section>

    </div>

  );
}


export default Home;

