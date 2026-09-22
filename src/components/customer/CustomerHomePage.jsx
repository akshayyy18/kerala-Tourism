import React from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerHomePage.css";
import CustomerNavbar from "./CustomerNavbar";

export default function CustomerHomePage() {
  const navigate = useNavigate();

  return (
    <div className="customer-home">
      <CustomerNavbar />

      {/* HERO */}

      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-small-text">EXPLORE THE WATER</p>

          <h1>
            Find Your Perfect
            <span> Boat Adventure</span>
          </h1>

          <p className="hero-description">
            Discover beautiful boats, amazing destinations, and unforgettable
            experiences.
          </p>

          <button className="explore-btn" onClick={() => navigate("/customer/boats")}>
            Explore Boats
          </button>
        </div>
      </section>

      {/* POPULAR SECTION */}

      <section className="popular-section">
        <p className="section-subtitle">DISCOVER</p>

        <h2>Explore Our Boats</h2>

        <p className="section-description">
          Choose from our collection of comfortable, premium and luxury boats.
        </p>

        <div className="category-container">
          <div className="category-card">
            <div className="category-icon">🚤</div>
            <h3>Speed Boats</h3>
            <p>Fast and exciting water rides.</p>
          </div>

          <div className="category-card">
            <div className="category-icon">⛵</div>
            <h3>Luxury Boats</h3>
            <p>Enjoy a premium experience.</p>
          </div>

          <div className="category-card">
            <div className="category-icon">🏝️</div>
            <h3>Houseboats</h3>
            <p>Relax and enjoy beautiful waters.</p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}

      <section className="why-section">
        <div className="why-content">
          <p className="section-subtitle">WHY CHOOSE US</p>

          <h2>Make Your Journey Special</h2>

          <div className="features">
            <div className="feature">
              <div>✓</div>
              <div>
                <h3>Verified Boats</h3>
                <p>Quality boats managed by our team.</p>
              </div>
            </div>

            <div className="feature">
              <div>✓</div>
              <div>
                <h3>Easy Booking</h3>
                <p>Book your favorite boat easily.</p>
              </div>
            </div>

            <div className="feature">
              <div>✓</div>
              <div>
                <h3>Best Experience</h3>
                <p>Enjoy a comfortable water journey.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="cta-section">
        <h2>Ready for Your Next Adventure?</h2>

        <p>Explore our boats and start your journey today.</p>

        <button onClick={() => navigate("/customer/boats")}>Browse Boats</button>
      </section>

      <footer className="customer-footer">
        <h3>AquaVoyage</h3>
        <p>Discover. Explore. Experience.</p>
        <p>© 2026 AquaVoyage. All rights reserved.</p>
      </footer>
    </div>
  );
}
