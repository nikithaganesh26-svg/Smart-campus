import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CampusMap from "./pages/CampusMap";
import About from "./pages/About";
import Login from "./pages/Login";
import Rating from "./pages/Rating";


function App() {

  // Check if user is already logged in
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("smartCampusUser") !== null
  );

  const [showRating, setShowRating] = useState(false);


  // =========================
  // LOGIN
  // =========================

  function handleLoginSuccess(userData) {

    localStorage.setItem(
      "smartCampusUser",
      JSON.stringify(userData)
    );

    setIsLoggedIn(true);
    setShowRating(false);

    window.history.pushState({}, "", "/");
  }


  // =========================
  // LOGOUT
  // =========================

  function handleLogout() {

    localStorage.removeItem("smartCampusUser");

    setIsLoggedIn(false);

    setShowRating(true);

    window.history.pushState(
      {},
      "",
      "/rating"
    );
  }


  // =========================
  // RATING
  // =========================

  if (showRating) {
    return <Rating />;
  }


  // =========================
  // LOGIN
  // =========================

  if (!isLoggedIn) {

    return (
      <Login
        onLoginSuccess={handleLoginSuccess}
      />
    );

  }


  // =========================
  // WEBSITE
  // =========================

  const path = window.location.pathname;

  let page;


  if (path === "/campus-map") {

    page = <CampusMap />;

  }

  else if (path === "/about") {

    page = <About />;

  }

  else {

    page = <Home />;

  }


  return (
    <>
      <Navbar onLogout={handleLogout} />

      {page}
    </>
  );
}


export default App;