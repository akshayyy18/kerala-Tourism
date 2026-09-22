import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import api from "../Services/api";
import "./BoatDetails.css";

export default function BoatDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [boat, setBoat] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const getSingleBoat = async () => {
    try {
      const response = await api.get(`/singleBoat/${id}`);

      console.log("Single boat response:", response.data);

      setBoat(response.data.data);
    } catch (error) {
      console.log("Single boat error:", error);

      setError(error.response?.data?.message || "Unable to fetch boat details");
    } finally {
      setLoading(false);
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
        <button className="back-button" onClick={() => navigate("/admin")}>
          ← Back to Dashboard
        </button>
        <div style={{ padding: "20px", color: "#c62828", fontSize: "1rem" }}>
          {error}
        </div>
      </div>
    );
  }

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       `Are you sure you want to delete ${boat.boatName}?`,
//     );

//     if (!confirmDelete) {
//       return;
//     }

//     try {
//       const response = await api.delete(`/deleteBoat/${id}`);

//       console.log("Delete response:", response.data);

//       navigate("/admin");
//     } catch (error) {
//       console.log("Delete error:", error);

//       setError(error.response?.data?.message || "Failed to delete boat");
//     }
//   };

  return (
    <div className="boat-details-wrapper">
      <button className="back-button" onClick={() => navigate("/admin")}>
        ← Back to Dashboard
      </button>

      {/* Product Detail Section */}
      <div className="product-detail">
        {/* Image Section */}
        <div className="product-image-section">
          <img src={boat.image} alt={boat.boatName} className="main-image" />
        </div>

        {/* Details Section */}
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
        </div>
      </div>
    </div>
  );
}
