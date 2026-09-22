import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Services/api";
// import "./admin/AddBoat.css";

export default function UpdataBoats() {
  const navigate = useNavigate();

  const { id } = useParams();
  

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

  const [loading, setLoading] = useState(true);

  const [updating, setUpdating] = useState(false);

  const getBoat = async () => {
    try {
      const response = await api.get(`/singleBoat/${id}`);

      console.log("Single boat:", response.data);

      setBoat(response.data.data);
    } catch (error) {
      console.log("Get boat error:", error);

      setError(error.response?.data?.message || "Unable to fetch boat");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBoat();
  }, [id]);

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
      setUpdating(true);

      const response = await api.put(`/updataBoat/${id}`, {
        boatName: boat.boatName,
        boatType: boat.boatType,
        category: boat.category,
        facility: boat.facility,
        capacity: Number(boat.capacity),
        price: Number(boat.price),
        location: boat.location,
        destination: boat.destination,
        description: boat.description,
        image: boat.image,

        status: boat.status,
      });

      console.log("Update response:", response.data);

      setSuccess("Boat updated successfully");
      navigate("/getBoats");
    } catch (error) {
      console.log("Update boat error:", error);

      setError(error.response?.data?.message || "Failed to update boat");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-body">
            <h2>Loading boat details...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h1>Update Boat</h1>

          <button
            className="modal-close-btn"
            onClick={() => navigate("/getBoats")}
            title="Close"
          >
            x
          </button>
        </div>

        <div className="modal-body">
          <p>Update the boat details below</p>

          {success && (
            <div className="message-container success-message">{success}</div>
          )}

          {/* ERROR */}

          {error && (
            <div className="message-container error-message">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
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
            <div className="form-group">
              <label>Description</label>

              <textarea
                name="description"
                value={boat.description || ""}
                onChange={handleChange}
                placeholder="Enter boat description"
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Boat Image</label>

              <input
                type="text"
                name="image"
                value={boat.image || ""}
                onChange={handleChange}
                placeholder="Enter image URL"
              />
            </div>

            <div className="form-group">
              <label>Status</label>

              <select name="status" value={boat.status} onChange={handleChange}>
                <option value="Available">Available</option>

                <option value="Booked">Booked</option>

                <option value="Maintenance">Maintenance</option>
              </select>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/getBoats")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={updating}
              >
                {updating ? "Updating..." : "Update Boat"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
