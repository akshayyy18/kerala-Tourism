import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Services/api";
import "./SeatSelection.css";

export default function SeatSelection() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSeats = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/admin/getSeats/${id}`);

      console.log("All seats:", response.data);

      setSeats(response.data.data || []);
    } catch (error) {
      console.log(error.response?.data || error.message);

      setError(error.response?.data?.message || "Failed to fetch seats");
    } finally {
      setLoading(false);
    }
  };

  const fetchBookedSeats = async () => {
    try {
      // Don't call API until date and time are selected
      if (!date || !time) {
        setBookedSeats([]);
        return;
      }

      const response = await api.get(`/admin/getBookedSeats/${id}`, {
        params: {
          date: date,
          time: time,
        },
      });

      console.log("Booked seats response:", response.data);

      setBookedSeats(response.data.data || []);
    } catch (error) {
      console.log("Booked seats error:", error.response?.data || error.message);

      setBookedSeats([]);
    }
  };


  useEffect(() => {
    fetchSeats();
  }, [id]);

  useEffect(() => {
    fetchBookedSeats();
  }, [id, date, time]);

  useEffect(() => {
    setSelectedSeats([]);
  }, [date, time]);

  const handleSeatClick = (seat) => {
    const isBooked = bookedSeats.some(
      (bookedSeatId) => bookedSeatId.toString() === seat._id.toString(),
    );

    if (isBooked) {
      return;
    }

    setSelectedSeats((previousSeats) => {
      const alreadySelected = previousSeats.some(
        (selectedSeat) => selectedSeat._id === seat._id,
      );

      if (alreadySelected) {
        return previousSeats.filter(
          (selectedSeat) => selectedSeat._id !== seat._id,
        );
      }

      return [...previousSeats, seat];
    });
  };

  const totalAmount = selectedSeats.reduce(
    (total, seat) => total + seat.price,
    0,
  );

  if (loading) {
    return (
      <main className="seat-selection-page">
        <div className="seat-selection-state">
          <h2>Finding your seats...</h2>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="seat-selection-page">
        <div className="seat-selection-state">
          <h2>Seats could not be loaded</h2>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="seat-selection-page">
      <div className="seat-selection-shell">
        {/* BACK BUTTON */}

        <button
          className="seat-back-button"
          type="button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        {/* HEADER */}

        <header className="seat-selection-header">
          <p className="seat-selection-eyebrow">AQUAVOYAGE RESERVATIONS</p>

          <h1>Choose your seats.</h1>

          <p>Select your date, time and seats.</p>
        </header>


        <div>
          <label>Select Date</label>

          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>


        <div>
          <label>Select Time</label>

          <select
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          >
            <option value="">Select Time</option>
            <option value="09:00 AM">09:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="01:00 PM">01:00 PM</option>
            <option value="03:00 PM">03:00 PM</option>
            <option value="05:00 PM">05:00 PM</option>
          </select>
        </div>
        <hr />
        {!date || !time ? (
          <div>
            <p>Please select date and time to see seat availability.</p>
          </div>
        ) : (
          <section className="seat-map-panel">
            <div className="seat-map-heading">
              <div>
                <p className="seat-panel-label">YOUR JOURNEY</p>

                <h2>Select a seat</h2>
              </div>

              <span className="seat-count-label">
                {seats.length} {seats.length === 1 ? "seat" : "seats"}
              </span>
            </div>

            {seats.length === 0 ? (
              <div className="seat-empty-state">
                <h3>No seats available</h3>
              </div>
            ) : (
              <>
                <div className="seat-grid">
                  {seats.map((seat) => {

                    const isBooked = bookedSeats.some(
                      (bookedSeatId) =>
                        bookedSeatId.toString() === seat._id.toString(),
                    );

                    const isSelected = selectedSeats.some(
                      (selectedSeat) => selectedSeat._id === seat._id,
                    );

                    return (
                      <button
                        key={seat._id}
                        type="button"
                        disabled={isBooked}
                        className={`seat-option
                          ${isSelected ? "selected" : ""}
                          ${isBooked ? "booked" : ""}
                        `}
                        onClick={() => handleSeatClick(seat)}
                      >
                        <span className="seat-option-number">
                          {seat.seatNumber}
                        </span>

                        <span className="seat-option-price">₹{seat.price}</span>
                        {isBooked && <span>Booked</span>}
                        {isSelected && !isBooked && <span>Selected</span>}
                      </button>
                    );
                  })}
                </div>
                <div className="seat-legend">
                  <span>
                    <i className="legend-swatch available" />
                    Available
                  </span>
                  <span>
                    <i className="legend-swatch selected" />
                    Selected
                  </span>
                  <span>
                    <i className="legend-swatch booked" />
                    Booked
                  </span>
                </div>
              </>
            )}
          </section>
        )}
        <aside className="seat-summary-panel">
          <p className="seat-panel-label">YOUR SELECTION</p>

          <h2>Booking Summary</h2>

          <div className="selected-seat-list">
            {selectedSeats.length === 0 ? (
              <p>Choose a seat to see it here.</p>
            ) : (
              selectedSeats.map((seat) => (
                <div className="selected-seat-row" key={seat._id}>
                  <span>Seat {seat.seatNumber}</span>
                  <strong>₹{seat.price}</strong>
                </div>
              ))
            )}
          </div>
          <div className="seat-summary-count">
            <span>Number of seats</span>
            <strong>{selectedSeats.length}</strong>
          </div>

          <div className="seat-summary-total">
            <span>Total amount</span>

            <strong>₹{totalAmount}</strong>
          </div>

          <button
            className="seat-continue-button"
            type="button"
            disabled={!date || !time || selectedSeats.length === 0}
            onClick={() => {
              const bookingData = {
                boatId: id,
                date: date,
                time: time,
                seatIds: selectedSeats.map((seat) => seat._id),
              };
              console.log("Booking data:", bookingData);
              navigate(`/bookingboat/${id}`, {
                state: {
                  date: date,
                  time: time,
                  selectedSeats: selectedSeats,
                  totalAmount: totalAmount,
                },
              });
            }}
          >
            Continue Booking →
          </button>
        </aside>
      </div>
    </main>
  );
}
