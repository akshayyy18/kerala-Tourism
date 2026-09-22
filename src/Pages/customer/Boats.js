import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";
import CustomerNavbar from "../../components/customer/CustomerNavbar";
import "./Boats.css";

export default function Customer() {
  const navigate = useNavigate();

  const [boats, setBoats] = useState([]);
  const [search, setSearch] = useState("");
  const [statuss, setStatuss] = useState("");
  const [prices, setPrices] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const getBoats = async () => {
    try {
      const response = await api.get("/boats/customer");

      console.log("Boat response:", response.data);

      setBoats(response.data.data || []);
    } catch (error) {
      console.log("Get boats error:", error);

      setError(error.response?.data?.message || "Unable to fetch boats");
    } finally {
      setLoading(false);
    }
  };

  const filterData = boats.filter((boat) => {
    const price = Number(boat.price);

    let priceRange = true;

    if (prices === "0-1000") {
      priceRange = price < 1000;
    }

    if (prices === "1000-2500") {
      priceRange = price >= 1000 && price < 2500;
    }

    if (prices === "2500-4500") {
      priceRange = price >= 2500 && price < 4500;
    }

    if (prices === "4500-9000") {
      priceRange = price >= 4500 && price < 9000;
    }

    if (prices === "9000-15000") {
      priceRange = price >= 9000 && price < 15000;
    }

    if (prices === "15000-20000") {
      priceRange = price >= 15000 && price < 20000;
    }
    return (
      boat.boatName?.toLowerCase().includes(search.toLowerCase()) &&
      (statuss === "" || boat.status === statuss) &&
      priceRange
    );
  });

  const handleViewDetails = (boatId) => {
    navigate(`/customer/boat/${boatId}`);
  };

  useEffect(() => {
    getBoats();
  }, []);

  if (loading) {
    return (
      <div className="customer-boats-page">
        <CustomerNavbar />
        <div className="boats-state">
          <div className="loading-spinner" />
          <h2>Loading boats...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="customer-boats-page">
        <CustomerNavbar />
        <div className="boats-state error-state">
          <h2>{error}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="customer-boats-page">
      <CustomerNavbar />

      <header className="boats-header">
        <p className="boats-eyebrow">AQUAVOYAGE COLLECTION</p>
        <h1>Kerala Boat Tourism</h1>
        <p>
          Choose a comfortable boat and set out across Kerala's beautiful
          waterways.
        </p>
      </header>

      <section className="available-boats">
        <input
          className="inputFilter"
          placeholder="search for boats"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={statuss} onChange={(e) => setStatuss(e.target.value)}>
          <option value="">Filters</option>
          <option value="Available">Available</option>
          <option value="Booked">Booked</option>
          <option value="Maintenance">Maintenance</option>
        </select>

        <select value={prices} onChange={(e) => setPrices(e.target.value)}>
          <option value="">Price Filters</option>

          <option value="0-1000">Under ₹1,000</option>

          <option value="1000-2500">₹1,000 - ₹2,500</option>
          <option value="2500-4500">₹2,500 - ₹4,500</option>
          <option value="4500-9000">₹4,500 - ₹9,000</option>
          <option value="9000-15000">₹9,000 - ₹15,000</option>
          <option value="15000-20000">₹15,000 - ₹20,000</option>
        </select>
        <div className="section-heading">
          <h2>Available Boats</h2>
          <span>
            {filterData.length} {filterData.length === 1 ? "boat" : "boats"}
          </span>
        </div>
        {filterData.length === 0 ? (
          <div className="boats-state empty-state">
            <h3>No boats available</h3>
            <p>New experiences will appear here soon.</p>
          </div>
        ) : (
          <div className="boat-grid">
            {filterData.map((boat) => (
              <article className="boat-card" key={boat._id}>
                {boat.image ? (
                  <img
                    className="boat-image"
                    src={boat.image}
                    alt={boat.boatName}
                  />
                ) : (
                  <div className="boat-image image-placeholder">
                    No image available
                  </div>
                )}

                <div className="boat-card-content">
                  <h3>{boat.boatName}</h3>

                  <p className="boat-location">
                    {boat.location} <span>•</span> {boat.destination}
                  </p>

                  <div className="boat-tags">
                    <span>{boat.boatType}</span>
                    <span>{boat.category}</span>
                    <span
                      className={`boat-status-badge ${boat.status?.toLowerCase()}`}
                    >
                      {boat.status}
                    </span>
                  </div>

                  <div className="boat-card-footer">
                    <p className="boat-price">
                      <small>From</small> ₹{boat.price}
                    </p>

                    <button
                      className="view-boat-button"
                      onClick={() => handleViewDetails(boat._id)}
                      disabled={boat.status === "Maintenance"}
                      title={
                        boat.status === "Maintenance"
                          ? "This boat is under maintenance"
                          : "View details"
                      }
                    >
                      {boat.status === "Maintenance"
                        ? "Under Maintenance"
                        : "View Details"}{" "}
                      {boat.status !== "Maintenance" && (
                        <span aria-hidden="true">→</span>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
