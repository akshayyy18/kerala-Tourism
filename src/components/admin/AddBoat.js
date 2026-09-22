import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";
import "./AddBoat.css";

export default function AddBoat() {
  const navigate = useNavigate();

  const [boat, setBoat] = useState({
    boatName: "",
    boatType: "",
    category: "",
    facility: "",
    capacity: "",
    price: "",
    location: "",
    destination: "",
    description: "",
    image: "",
    status: "Available",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBoat({
      ...boat,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !boat.boatName ||
      !boat.boatType ||
      !boat.category ||
      !boat.facility ||
      !boat.capacity ||
      !boat.price ||
      !boat.location ||
      !boat.destination
    ) {
      setError("Please fill all required fields");

      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/boatData", {
        ...boat,
        capacity: Number(boat.capacity),
        price: Number(boat.price),
      });

      console.log("Create boat response:", response.data);

      setSuccess("Boat created successfully");

      setBoat({
        boatName: "",
        boatType: "",
        category: "",
        facility: "",
        capacity: "",
        price: "",
        location: "",
        destination: "",
        description: "",
        image: "",
        status: "Available",
      });

      setTimeout(() => {
        navigate("/admin");
      }, 1000);
    } catch (error) {
      console.log("Create boat error:", error);

      setError(error.response?.data?.message || "Failed to create boat");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Modal Header */}
        <div className="modal-header">
          <h1>Add New Boat</h1>
          <button
            className="modal-close-btn"
            onClick={() => navigate("/admin")}
            title="Close"
          >
            x
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <p>Enter the boat details below to add a new boat to your fleet</p>

          {success && (
            <div className="message-container success-message">{success}</div>
          )}
          {error && (
            <div className="message-container error-message">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Boat Name */}
            <div className="form-group">
              <label>
                Boat Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="boatName"
                value={boat.boatName}
                onChange={handleChange}
                placeholder="Enter boat name"
                required
              />
            </div>

            {/* Boat Type */}
            <div className="form-group">
              <label>
                Boat Type <span className="required">*</span>
              </label>
              <select
                name="boatType"
                value={boat.boatType}
                onChange={handleChange}
                required
              >
                <option value="">Select Boat Type</option>
                <option value="Houseboat">Houseboat</option>
                <option value="Shikara">Shikara</option>
                <option value="Motor Boat">Motor Boat</option>
                <option value="Speed Boat">Speed Boat</option>
                <option value="Luxury Boat">Luxury Boat</option>
                <option value="Cruise Boat">Cruise Boat</option>
                <option value="Country Boat">Country Boat</option>
              </select>
            </div>

            {/* Category */}
            <div className="form-group">
              <label>
                Category <span className="required">*</span>
              </label>
              <select
                name="category"
                value={boat.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>

            {/* Facility */}
            <div className="form-group">
              <label>
                Facility <span className="required">*</span>
              </label>
              <select
                name="facility"
                value={boat.facility}
                onChange={handleChange}
                required
              >
                <option value="">Select Facility</option>
                <option value="AC">AC</option>
                <option value="Non-AC">Non-AC</option>
              </select>
            </div>

            {/* Capacity */}
            <div className="form-group">
              <label>
                Capacity <span className="required">*</span>
              </label>
              <input
                type="number"
                name="capacity"
                value={boat.capacity}
                onChange={handleChange}
                min="1"
                placeholder="Number of passengers"
                required
              />
            </div>

            {/* Price */}
            <div className="form-group">
              <label>
                Price <span className="required">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={boat.price}
                onChange={handleChange}
                min="0"
                placeholder="Enter price"
                required
              />
            </div>

            {/* Location */}
            <div className="form-group">
              <label>
                Location <span className="required">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={boat.location}
                onChange={handleChange}
                placeholder="Example: Alleppey"
                required
              />
            </div>

            {/* Destination */}
            <div className="form-group">
              <label>
                Destination <span className="required">*</span>
              </label>
              <input
                type="text"
                name="destination"
                value={boat.destination}
                onChange={handleChange}
                placeholder="Example: Kumarakom"
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={boat.description}
                onChange={handleChange}
                placeholder="Enter boat description"
                rows="4"
              />
            </div>

            {/* Boat Image */}
            <div className="form-group">
              <label>Boat Image</label>
              <input
                type="text"
                name="image"
                value={boat.image}
                onChange={handleChange}
                placeholder="Enter image URL"
              />
            </div>

            {/* Status */}
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={boat.status} onChange={handleChange}>
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/admin")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Boat"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
