import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CampusMap from "./pages/CampusMap";
import "./pages/Home.css";

function App() {
  const path = window.location.pathname;

  return (
    <div>
      <Navbar />

      {path === "/campus-map" ? <CampusMap /> : <Home />}
    </div>
  );
}

export default App;