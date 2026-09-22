import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import api from "../../Services/api";
import "../BoatDetails.css";

export default function BoatDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [boat, setBoat] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const getSingleBoat = async () => {
    try {
      const response = await api.get(`/getSingle/${id}`);

      console.log("Single boat response:", response.data);

      setBoat(response.data.data);
    } catch (error) {
      console.log("Single boat error:", error);

      setError(error.response?.data?.message || "Unable to fetch boat details");
    } finally {
      setLoading(false);
    }
  };

  const handleViewdata = (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/customer/login");
      return;
    }
    if (boat.status !== "Booked" && boat.status !== "Maintenance") {
      navigate(`/bookingboat/${boat._id}`);
    }
  };

  useEffect(() => {
    getSingleBoat();
  }, [id]);

  if (loading) {
    return (
      <div className="boat-details-wrapper">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading boat details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="boat-details-wrapper">
        <button className="back-button" onClick={() => navigate("/customer")}>
          ← Back to Dashboard
        </button>
        <div style={{ padding: "20px", color: "#c62828", fontSize: "1rem" }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="boat-details-wrapper">
      <button
        className="back-button"
        onClick={() => navigate("/customer/boats")}
      >
        ← Back to Dashboard
      </button>

      {/* Product Detail Section */}
      <div className="product-detail">
        {/* Image Section */}
        <div className="product-image-section">
          <img src={boat.image} alt={boat.boatName} className="main-image" />
        </div>

        <div className="product-details-section">
          <h1 className="product-title">{boat.boatName}</h1>

          <div className="rating-section">
            <span
              className={`status-badge status-${boat.status?.toLowerCase()}`}
            >
              {boat.status}
            </span>
          </div>

          {/* Price */}
          <div className="price-section">
            <span className="price-label">Price:</span>
            <span className="price-value">₹{boat.price}</span>
          </div>

          {/* Key Features */}
          <div className="key-features">
            <div className="feature-row">
              <span className="feature-label">Boat Type</span>
              <span className="feature-value">{boat.boatType}</span>
            </div>
            <div className="feature-row">
              <span className="feature-label">Category</span>
              <span className="feature-value">{boat.category}</span>
            </div>
            <div className="feature-row">
              <span className="feature-label">Facility</span>
              <span className="feature-value">{boat.facility}</span>
            </div>
            <div className="feature-row">
              <span className="feature-label">Capacity</span>
              <span className="feature-value">{boat.capacity} members</span>
            </div>
            <div className="feature-row">
              <span className="feature-label">Location</span>
              <span className="feature-value">{boat.location}</span>
            </div>
            <div className="feature-row">
              <span className="feature-label">Destination</span>
              <span className="feature-value">{boat.destination}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      {boat.description && (
        <div className="description-section">
          <h2 className="description-title">About this boat</h2>
          <p className="description-text">{boat.description}</p>
        </div>
      )}

      {/* Additional Info */}
      <div className="info-section">
        <h2 className="description-title">Additional Information</h2>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Boat ID</span>
            <span className="info-value">{boat._id}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Created At</span>
            <span className="info-value">
              {boat.createdAt
                ? new Date(boat.createdAt).toLocaleDateString()
                : "-"}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Updated At</span>
            <span className="info-value">
              {boat.updatedAt
                ? new Date(boat.updatedAt).toLocaleDateString()
                : "-"}
            </span>
          </div>
          <button
            className="booknow"
            onClick={() => handleViewdata(boat._id)}
            disabled={boat.status === "Maintenance"}
            title={
              boat.status === "Maintenance"
                ? "This boat is under maintenance"
                : "Book this boat"
            }
          >
            {boat.status === "Booked"
              ? "FULLY BOOKED"
              : boat.status === "Maintenance"
                ? "UNDER MAINTENANCE"
                : "BOOK NOW"}
          </button>
        </div>
      </div>
    </div>
  );
}
