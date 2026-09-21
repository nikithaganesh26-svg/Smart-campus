import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CampusMap from "./pages/CampusMap";
import About from "./pages/about";
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
  // LOGOUT / CHECK-OUT
  // =========================

  async function handleLogout() {

    // Get logged-in visitor
    const savedUser = localStorage.getItem("smartCampusUser");

    if (!savedUser) {
      setIsLoggedIn(false);
      setShowRating(true);
      return;
    }

    const user = JSON.parse(savedUser);

    try {

      // Send checkout request to backend
      const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/visitors/check-out`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            visitorId: user._id
          })
        }
      );


      const result = await response.json();


      // Check backend response
      if (!response.ok || !result.success) {

        alert(
          result.message ||
          "Unable to check out visitor."
        );

        return;
      }


      // Check-out successful
      console.log(
        "Visitor checked out successfully:",
        result.visitor
      );


      // Remove logged-in visitor
      localStorage.removeItem("smartCampusUser");

      setIsLoggedIn(false);

      setShowRating(true);

      window.history.pushState(
        {},
        "",
        "/rating"
      );


    } catch (error) {

      console.error(
        "Check-out error:",
        error
      );

      alert(
        "Unable to connect to the server. Please make sure the backend is running."
      );

    }

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