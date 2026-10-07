import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import { useNavigate, useParams } from "react-router-dom";
import "./IndividualHistory.css";

export default function IndividualHistory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await api.get(`/book-data/${id}`);
      console.log(response.data)
      setData(response.data.data);

    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const statusClass = (data?.bookingStatus || "pending").toLowerCase();

  return (
    <div className="history-detail-page">
      <button onClick={() => navigate("/myBookings")}>Back</button>
      <div className="history-detail-shell">
        <div className="history-detail-header">
          <div>
            <p className="history-eyebrow">Booking overview</p>
            <h1>Booking Details</h1>
          </div>
          {data && (
            <span className={`history-status-badge status-${statusClass}`}>
              {data.bookingStatus}
            </span>
          )}
        </div>

        {loading ? (
          <div className="history-state-card">Loading booking details...</div>
        ) : data ? (
          <div className="history-detail-card">
            <div className="history-detail-top">
              <div>
                <p className="history-detail-label">Customer</p>
                <h2>{data.customerName}</h2>
              </div>
              {/* <div className="history-amount">₹{data.amount}</div> */}
            </div>
            <div className="history-detail-grid">
              <div className="history-meta-item">
                <span className="history-meta-label">Boat Name</span>
                <strong>{data.boatName}</strong>
              </div>

              <div className="history-meta-item">
                <span className="history-meta-label">Boat Type</span>
                <strong>{data.boatId?.boatType || "Not available"}</strong>
              </div>

              <div className="history-meta-item">
                <span className="history-meta-label">Category</span>
                <strong>{data.boatId?.category || "Not available"}</strong>
              </div>

              <div className="history-meta-item">
                <span className="history-meta-label">Passengers</span>
                <strong>{data.passengers}</strong>
              </div>

              <div className="history-meta-item">
                <span className="history-meta-label">Date</span>
                <strong>{new Date(data.date).toLocaleDateString()}</strong>
              </div>

              <div className="history-meta-item">
                <span className="history-meta-label">Time</span>
                <strong>{data.time}</strong>
              </div>

              <div className="history-meta-item full-width">
                <span className="history-meta-label">Seat Number(s)</span>
                <strong>
                  {data.seatIds?.map((seat) => seat.seatNumber).join(", ") ||
                    "Not assigned"}
                </strong>
              </div>
            </div>
          </div>
        ) : (
          <div className="history-state-card">
            Booking information could not be loaded.
          </div>
        )}
      </div>
    </div>
  );
}
