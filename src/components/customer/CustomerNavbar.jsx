import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CustomerNavbar.css";

export default function CustomerNavbar() {
  const navigate = useNavigate();
  const [showLoginMenu, setShowLoginMenu] = useState(false);

  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  let user = null;

  if (userData) {
    try {
      user = JSON.parse(userData);
    } catch (error) {
      console.log("Invalid user data");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  const handleBookings = () => {
    if (!token) {
      navigate("/customer/login");
      return;
    }

    navigate("/myBookings");
  };

  return (
    <nav className="customer-navbar">
      <div className="customer-logo" onClick={() => navigate("/")}>
        AquaVoyage
      </div>

      <div className="customer-nav-links">
        <Link to="/">Home</Link>

        <Link to="/customer/boats">Boats</Link>

        <Link to="/about">About</Link>

        {token && user?.role === "customer" && (
          <button className="nav-bookings-btn" onClick={handleBookings}>
            Bookings
          </button>
        )}

        <Link to="/contact">Contact</Link>
      </div>

      <div className="customer-nav-right">
        {token && user ? (
          <>
            <span className="customer-name">Hi, {user.name}</span>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <div className="login-dropdown">
            <button
              className="login-btn"
              onClick={() => setShowLoginMenu(!showLoginMenu)}
            >
              Login ▼
            </button>

            {showLoginMenu && (
              <div className="login-menu">
                <button
                  onClick={() => {
                    setShowLoginMenu(false);
                    navigate("/customer/login");
                  }}
                >
                  Customer
                </button>

                <button
                  onClick={() => {
                    setShowLoginMenu(false);
                    navigate("/admin/login");
                  }}
                >
                Admin
                </button>
              </div>
            )}

            <button
              className="register-btn"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
