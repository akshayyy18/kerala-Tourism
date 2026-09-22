import React, { useEffect, useState } from "react";
import api from "../Services/api";
import NormalAdminNavbar from "./NormalAdminNavbar";
import { useNavigate } from "react-router-dom";
import "./IndividualBoats.css";

export default function IndividualBoats() {
  const [boats, setBoats] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"))

  const permissions = user?.permissions || []

  const getBoats = async () => {
    try {
      const response = await api.get("/getBoat");

      console.log(response.data);

      setBoats(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBoats();
  }, []);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this boat?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await api.delete(`/deleteBoat/${id}`);

      alert(response.data.message);

      setBoats((previous) => previous.filter((boat) => boat._id !== id));
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to delete boat");
    }
  };

  return (
    <div className="boats-page">
      <NormalAdminNavbar />

      <div className="boats-container">
        <div className="boats-header">
          <div>
            <h1 className="boats-title">My Boats</h1>
            <p className="boats-subtitle">Manage your Kerala boat listings</p>
          </div>

          <div className="boats-actions">
            { permissions.includes("createBoat") &&<button
              className="add-boat-btn"
              onClick={() => navigate("/addData")}
            >
              Add Boat
            </button>}
          </div>
        </div>

        {boats.length === 0 ? (
          <div className="empty-state">
            <h3>No boats found</h3>
          </div>
        ) : (
          <div className="boat-grid">
            {boats.map((boat) => (
              <div key={boat._id} className="boat-card">
                {boat.image && (
                  <img
                    className="boat-card-image"
                    src={boat.image}
                    alt={boat.boatName}
                  />
                )}

                <div className="boat-card-body">
                  <h2 className="boat-card-title">{boat.boatName}</h2>

                  <ul className="boat-details-list">
                    <li>
                      <strong>Boat Type:</strong>
                      <span>{boat.boatType}</span>
                    </li>
                    <li>
                      <strong>Category:</strong>
                      <span>{boat.category}</span>
                    </li>
                    <li>
                      <strong>Facility:</strong>
                      <span>{boat.facility}</span>
                    </li>
                    <li>
                      <strong>Capacity:</strong>
                      <span>{boat.capacity}</span>
                    </li>
                    <li>
                      <strong>Price:</strong>
                      <span>₹{boat.price}</span>
                    </li>
                    <li>
                      <strong>Location:</strong>
                      <span>{boat.location}</span>
                    </li>
                    <li>
                      <strong>Destination:</strong>
                      <span>{boat.destination}</span>
                    </li>
                    <li>
                      <strong>Status:</strong>
                      <span
                        className={`boat-status ${
                          boat.status?.toLowerCase().replace(/\s+/g, "-") ||
                          "available"
                        }`}
                      >
                        {boat.status}
                      </span>
                    </li>
                    <li>
                      <strong>Description:</strong>
                      <span>
                        {boat.description || "No description provided"}
                      </span>
                    </li>
                  </ul>

                  <div className="boat-actions">
                    { permissions.includes("updateBoat") &&<button
                      className="boat-action-btn"
                      onClick={() => navigate(`/updateBoat/${boat._id}`)}
                    >
                      Update
                    </button>}
                   { permissions.includes("deleteBoat") &&<button
                      className="boat-delete-btn"
                      onClick={() => handleDelete(boat._id)}
                    >
                      Delete
                    </button>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
