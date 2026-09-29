import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import { useNavigate } from "react-router-dom";
import "./CustomerBooking.css";
import CustomerNavbar from "./CustomerNavbar";

export default function CustomerBooking() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await api.get("/book-data");
      console.log(response.data);
      setData(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <CustomerNavbar />
      <main className="customer-bookings-page">
        <div className="customer-bookings-shell">
          <header className="customer-bookings-header">
            <div>
              <p className="customer-bookings-eyebrow">AQUAVOYAGE JOURNEYS</p>
              <h1>My bookings</h1>
              <p>Keep track of your upcoming Kerala waterways experiences.</p>
            </div>
            <button
              className="bookings-back-button"
              onClick={() => navigate("/customer")}
            >
              <span aria-hidden="true">←</span> Back to dashboard
            </button>
          </header>

          <section className="customer-bookings-content">
            <div className="bookings-section-heading">
              <h2>Reservation history</h2>
              <span>
                {data.length} {data.length === 1 ? "booking" : "bookings"}
              </span>
            </div>

            {data.length === 0 ? (
              <div className="bookings-empty">
                <span className="empty-mark" aria-hidden="true">
                  ◌
                </span>
                <h2>No bookings yet</h2>
                <p>
                  Your next adventure across Kerala's backwaters starts here.
                </p>
                <button
                  className="browse-boats-button"
                  onClick={() => navigate("/customer/boats")}
                >
                  Browse boats <span aria-hidden="true">→</span>
                </button>
              </div>
            ) : (
              <div className="customer-bookings-grid">
                {data.map((booking, index) => (
                  <article
                    className="customer-booking-card"
                    key={booking._id || index}
                  >
                    <div className="customer-booking-card-top">
                      <div>
                        <p className="booking-number">
                          RESERVATION {String(index + 1).padStart(2, "0")}
                        </p>
                        <h3> {booking.boatId?.boatName}</h3>
                      </div>
                      {/* <span className="booking-confirmed">Confirmed</span> */}
                      <span
                        className={`booking-status ${booking.bookingStatus?.toLowerCase()}`}
                      >
                        {booking.bookingStatus || "Pending"}
                      </span>
                    </div>
                    <div className="customer-booking-details">
                      <div>
                        <span>Guest</span>
                        <strong>{booking.customerName}</strong>
                      </div>
                      <div>
                        <span>Mobile</span>
                        <strong>{booking.mobileNumber}</strong>
                      </div>
                      <div>
                        <span>Date</span>
                        <strong>
                          {booking.date
                            ? new Date(booking.date).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                },
                              )
                            : "-"}
                        </strong>
                      </div>
                      <div>
                        <span>Time slot</span>
                        <strong>{booking.time}</strong>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
