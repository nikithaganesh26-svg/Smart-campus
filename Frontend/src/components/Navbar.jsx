import "./Navbar.css";

function Navbar({ onLogout }) {

  return (
    <nav className="navbar">

      <div className="logo">

        <div className="logo-circle">
          SJ
        </div>

        <div className="logo-text">

          <h2>
            St. Joseph's
          </h2>

          <span>
            Group of Institutions
          </span>

        </div>

      </div>


      <div className="nav-links">

        <a href="/">
          Home
        </a>

        <a href="/campus-map">
          Campus Map
        </a>

        <a href="/about">
          About
        </a>

        <button
          className="logout-button"
          onClick={onLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;