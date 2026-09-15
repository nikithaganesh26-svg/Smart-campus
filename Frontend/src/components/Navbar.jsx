import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        <div className="logo-circle">SJIT</div>

        <div>
          <h2>St. Joseph's</h2>
          <span>Institute of Technology</span>
        </div>
      </div>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/campus-map">Campus Map</a>
        <a href="#">Departments</a>
        <a href="#">About</a>
      </div>

    </nav>
  );
}

export default Navbar;
