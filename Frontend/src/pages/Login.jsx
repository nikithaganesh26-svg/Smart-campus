import { useState } from "react";
import "./Login.css";

function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    otherRole: ""
  });

  const [userType, setUserType] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ==============================
  // NAME VALIDATION
  // ==============================
  function validateName(value) {
    if (value.trim() === "") {
      return "Name is required";
    }

    if (!/^[A-Za-z ]+$/.test(value)) {
      return "Name should contain only alphabets";
    }

    return "";
  }

  // ==============================
  // EMAIL VALIDATION
  // ==============================
  function validateEmail(value) {
    if (value.trim() === "") {
      return "Email is required";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Please enter a valid email address";
    }

    return "";
  }

  // ==============================
  // PHONE VALIDATION
  // ==============================
  function validatePhone(value) {
    if (value.trim() === "") {
      return "Phone number is required";
    }

    if (!/^[0-9]{10}$/.test(value)) {
      return "Phone number must contain exactly 10 digits";
    }

    return "";
  }

  // ==============================
  // OTHER ROLE VALIDATION
  // ==============================
  function validateOtherRole(value) {
    if (value.trim() === "") {
      return "Please specify who you are";
    }

    if (!/^[A-Za-z ]+$/.test(value)) {
      return "Only alphabets are allowed";
    }

    return "";
  }

  // ==============================
  // INPUT CHANGE
  // ==============================
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({
      ...formData,
      [name]: value
    });

    let error = "";

    if (name === "name") {
      error = validateName(value);
    }

    if (name === "email") {
      error = validateEmail(value);
    }

    if (name === "phone") {
      error = validatePhone(value);
    }

    if (name === "otherRole") {
      error = validateOtherRole(value);
    }

    setErrors({
      ...errors,
      [name]: error
    });
  }

  // ==============================
  // USER TYPE CHANGE
  // ==============================
  function handleUserTypeChange(event) {
    const value = event.target.value;

    setUserType(value);

    setErrors({
      ...errors,
      userType: "",
      otherRole: ""
    });

    if (value !== "Other") {
      setFormData({
        ...formData,
        otherRole: ""
      });
    }
  }

  // ==============================
  // FORM VALIDATION
  // ==============================
  function validateForm() {
    const newErrors = {};

    const nameError = validateName(formData.name);

    if (nameError) {
      newErrors.name = nameError;
    }

    const emailError = validateEmail(formData.email);

    if (emailError) {
      newErrors.email = emailError;
    }

    const phoneError = validatePhone(formData.phone);

    if (phoneError) {
      newErrors.phone = phoneError;
    }

    if (userType === "") {
      newErrors.userType = "Please select who you are";
    }

    if (userType === "Other") {
      const otherError = validateOtherRole(formData.otherRole);

      if (otherError) {
        newErrors.otherRole = otherError;
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  // ==============================
  // LOGIN + BACKEND CHECK-IN
  // ==============================
  async function handleLogin(event) {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      // Read QR scan ID
      const params = new URLSearchParams(
        window.location.search
      );

      const scanId =
        params.get("scanId") || "MAIN_GATE";

      // Visitor information
      const visitorData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,

        visitorType:
          userType === "Other"
            ? formData.otherRole
            : userType,

        scanId: scanId
      };

      // ==============================
      // SEND DATA TO BACKEND
      // ==============================
      const response = await fetch(
        "http://localhost:5000/api/visitors/check-in",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(visitorData)
        }
      );

      const result = await response.json();

      // ==============================
      // CHECK BACKEND RESPONSE
      // ==============================
      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to save visitor"
        );
      }

      // ==============================
      // SAVE DATABASE RECORD LOCALLY
      // ==============================
      const savedVisitor = result.visitor;

      localStorage.setItem(
        "smartCampusUser",
        JSON.stringify(savedVisitor)
      );

      // ==============================
      // INFORM APP.JSX
      // ==============================
      onLoginSuccess(savedVisitor);

    } catch (error) {
      console.error("Login error:", error);

      alert(
        error.message ||
        "Unable to connect to the server. Please try again."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">

      <div className="login-card">

        {/* ==============================
            LEFT SIDE
        ============================== */}

        <div className="login-info">

          <div className="brand">

            <div className="brand-logo">
              SJ
            </div>

            <div>
              <h2>
                St. Joseph's Group of Institutions
              </h2>
            </div>

          </div>

          <div className="info-content">

            <p className="welcome">
              WELCOME TO
            </p>

            <h1>
              Explore Our
              <br />
              Campus
            </h1>

            <p className="info-text">
              Discover buildings, departments,
              laboratories and important campus
              facilities through our interactive
              smart campus map.
            </p>

            <div className="features">

              <div>
                <span>01</span>
                Interactive Campus Map
              </div>

              <div>
                <span>02</span>
                Search Campus Locations
              </div>

              <div>
                <span>03</span>
                Easy Navigation
              </div>

            </div>

          </div>

        </div>

        {/* ==============================
            RIGHT SIDE LOGIN FORM
        ============================== */}

        <div className="login-form">

          <div className="form-heading">

            <p>
              SMART CAMPUS ACCESS
            </p>

            <h2>
              Login to Continue
            </h2>

            <span>
              Enter your details to explore the campus.
            </span>

          </div>

          <form onSubmit={handleLogin}>

            {/* NAME */}

            <div className="form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />

              {errors.name && (
                <small className="error">
                  {errors.name}
                </small>
              )}

            </div>

            {/* USER TYPE */}

            <div className="form-group">

              <label>
                Who are you?
              </label>

              <select
                value={userType}
                onChange={handleUserTypeChange}
              >

                <option value="">
                  Select your role
                </option>

                <option value="Student">
                  Student
                </option>

                <option value="Parent">
                  Parent
                </option>

                <option value="Faculty">
                  Faculty
                </option>

                <option value="Vendor">
                  Vendor
                </option>

                <option value="Alumni">
                  Alumni
                </option>

                <option value="Recruiter / Company">
                  Recruiter / Company
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

              {errors.userType && (
                <small className="error">
                  {errors.userType}
                </small>
              )}

            </div>

            {/* OTHER ROLE */}

            {userType === "Other" && (

              <div className="form-group">

                <label>
                  Please specify
                </label>

                <input
                  type="text"
                  name="otherRole"
                  placeholder="Enter who you are"
                  value={formData.otherRole}
                  onChange={handleChange}
                />

                {errors.otherRole && (
                  <small className="error">
                    {errors.otherRole}
                  </small>
                )}

              </div>

            )}

            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />

              {errors.email && (
                <small className="error">
                  {errors.email}
                </small>
              )}

            </div>

            {/* PHONE */}

            <div className="form-group">

              <label>
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter 10 digit phone number"
                value={formData.phone}
                onChange={handleChange}
                maxLength="10"
              />

              {errors.phone && (
                <small className="error">
                  {errors.phone}
                </small>
              )}

            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >

              {loading
                ? "Logging in..."
                : "Login"
              }

              {!loading && (
                <span>
                  →
                </span>
              )}

            </button>

          </form>

          <p className="login-footer">
            Smart Campus • St. Joseph's Group of Institutions
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;