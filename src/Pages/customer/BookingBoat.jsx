// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../../Services/api";
// import "./BookingBoat.css";

// export default function BookingBoat() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [data, setData] = useState(null);

//   const [booking, setBooking] = useState({
//     customerName: "",
//     mobileNumber: "",
//     date: "",
//     time: "",
//     passengers: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [bookingLoading, setBookingLoading] = useState(false);

//   const getData = async () => {
//     try {
//       const response = await api.get(`/getSingle/${id}`);

//       console.log("Boat:", response.data);

//       setData(response.data.data);
//     } catch (error) {
//       console.log("Boat error:", error);

//       setError(error.response?.data?.message || "Unable to fetch boat details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setBooking({
//       ...booking,
//       [name]: value,
//     });
//   };

//   const handleMobileChange = (e) => {
//     const value = e.target.value.replace(/\D/g, "").slice(0, 10);

//     setBooking({
//       ...booking,
//       mobileNumber: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!/^[0-9]{10}$/.test(booking.mobileNumber)) {
//       setError("Enter a valid 10 digit mobile number");
//       return;
//     }

//     if (Number(booking.passengers) > Number(data.capacity)) {
//       setError(`Maximum ${data.capacity} passengers are allowed`);
//       return;
//     }

//     try {
//       setBookingLoading(true);
//       const response = await api.post("/book-data", {
//         boatId: data._id,
//         customerName: booking.customerName,
//         mobileNumber: booking.mobileNumber,
//         date: booking.date,
//         time: booking.time,
//         passengers: Number(booking.passengers),
//       });

//       console.log("Booking response:", response.data);

//       setSuccess("Booking created successfully!");

//       setBooking({
//         customerName: "",
//         mobileNumber: "",
//         date: "",
//         time: "",
//         passengers: "",
//       });
//       setTimeout(() => {
//         navigate("/customer/boats");
//       }, 1000);
//     } catch (error) {
//       console.log("Booking error:", error);

//       setError(error.response?.data?.message || "Booking failed");
//     } finally {
//       setBookingLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="booking-page">
//         <div className="booking-empty">
//           <div className="booking-loader" />
//           <h2>Preparing your booking</h2>
//           <p>Fetching the latest boat details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="booking-page">
//         <div className="booking-empty">
//           <h2>{error || "Boat not found"}</h2>
//           <p>We could not load this boat right now.</p>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div>
//       <button onClick={() => navigate(-1)}>Back</button>
//       <main className="booking-page">
//         <div className="booking-shell">
//           <header className="booking-header">
//             <p className="booking-eyebrow">AQUAVOYAGE RESERVATIONS</p>
//             <h1>Book your escape.</h1>
//             <p>
//               Reserve your place on the water and make your Kerala journey
//               memorable.
//             </p>
//           </header>

//           <section className="booking-card">
//             <div className="booking-card-top">
//               <div>
//                 <p className="card-label">SELECTED BOAT</p>
//                 <h2>{data.boatName}</h2>
//               </div>
//               <span className={`booking-status ${data.status?.toLowerCase()}`}>
//                 {data.status}
//               </span>
//             </div>

//             {data.image && (
//               <img
//                 className="booking-boat-image"
//                 src={data.image}
//                 alt={data.boatName}
//               />
//             )}

//             <div className="booking-details">
//               <div className="booking-detail">
//                 <span>Boat type</span>
//                 <strong>{data.boatType}</strong>
//               </div>
//               <div className="booking-detail">
//                 <span>Category</span>
//                 <strong>{data.category}</strong>
//               </div>
//               <div className="booking-detail">
//                 <span>Facility</span>
//                 <strong>{data.facility}</strong>
//               </div>
//               <div className="booking-detail">
//                 <span>Capacity</span>
//                 <strong>{data.capacity} members</strong>
//               </div>
//               <div className="booking-detail">
//                 <span>Location</span>
//                 <strong>{data.location}</strong>
//               </div>
//               <div className="booking-detail">
//                 <span>Destination</span>
//                 <strong>{data.destination}</strong>
//               </div>
//             </div>

//             <div className="booking-total">
//               <span>Reservation total</span>
//               <strong>₹{data.price}</strong>
//             </div>

//             <div className="booking-form-wrap">
//               <div className="form-heading">
//                 <p className="card-label">FILL YOUR DETAILS TO BOOK A BOAT</p>
//                 <h2>Customer information</h2>
//               </div>
//               {error && (
//                 <p className="booking-message error-message">{error}</p>
//               )}
//               {success && (
//                 <p className="booking-message success-message">{success}</p>
//               )}
//               <form className="booking-form" onSubmit={handleSubmit}>
//                 <div className="form-field">
//                   <label htmlFor="customerName">Customer name</label>
//                   <input
//                     id="customerName"
//                     type="text"
//                     name="customerName"
//                     value={booking.customerName}
//                     onChange={handleChange}
//                     placeholder="Enter your name"
//                     required
//                   />
//                 </div>
//                 <div className="form-field">
//                   <label htmlFor="mobileNumber">Mobile number</label>
//                   <input
//                     id="mobileNumber"
//                     type="text"
//                     name="mobileNumber"
//                     value={booking.mobileNumber}
//                     onChange={handleMobileChange}
//                     placeholder="Enter mobile number"
//                     maxLength="10"
//                     required
//                   />
//                 </div>
//                 <div className="form-field">
//                   <label htmlFor="date">Booking date</label>
//                   <input
//                     id="date"
//                     type="date"
//                     name="date"
//                     value={booking.date}
//                     onChange={handleChange}
//                     min={new Date().toISOString().split("T")[0]}
//                     required
//                   />
//                 </div>
//                 <div className="form-field">
//                   <label htmlFor="time">Time slot</label>
//                   <select
//                     id="time"
//                     name="time"
//                     value={booking.time}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Select Time Slot</option>
//                     <option value="09:00 AM - 12:00 PM">
//                       09:00 AM - 12:00 PM
//                     </option>
//                     <option value="01:00 PM - 04:00 PM">
//                       01:00 PM - 04:00 PM
//                     </option>
//                     <option value="05:00 PM - 08:00 PM">
//                       05:00 PM - 08:00 PM
//                     </option>
//                   </select>
//                 </div>
//                 <div className="form-field">
//                   <label htmlFor="passengers">Number of passengers</label>
//                   <input
//                     id="passengers"
//                     type="number"
//                     name="passengers"
//                     value={booking.passengers}
//                     onChange={handleChange}
//                     min="1"
//                     max={data.capacity}
//                     required
//                   />
//                   <p className="field-hint">
//                     Maximum capacity: {data.capacity}
//                   </p>
//                 </div>

//                 <div className="form-actions">
//                   <button
//                     className="book-now-button"
//                     type="submit"
//                     disabled={bookingLoading}
//                   >
//                     {bookingLoading ? "Booking..." : "Confirm booking"}
//                     <span aria-hidden="true">→</span>
//                   </button>
//                   <button
//                     className="cancel-button"
//                     type="button"
//                     onClick={() => navigate(`/customer/boat/${data._id}`)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import api from "../../Services/api";
import "./BookingBoat.css";

export default function BookingBoat() {
  const { id } = useParams();

  const navigate = useNavigate();

  const location = useLocation();

  // Data received from SeatSelection
  const selectedSeats = location.state?.selectedSeats || [];
  const selectedDate = location.state?.date || "";
  const selectedTime = location.state?.time || "";
  const totalAmount = location.state?.totalAmount || 0;
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  const [bookingLoading, setBookingLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/getSingle/${id}`);
      console.log("Boat:", response.data);
      setData(response.data.data);
    } catch (error) {
      console.log("Boat error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!selectedDate) {
      setError("Booking date is missing");
      return;
    }
    if (!selectedTime) {
      setError("Booking time is missing");
      return;
    }
    if (!selectedSeats || selectedSeats.length === 0) {
      setError("Please select at least one seat");
      return;
    }
    try {
      setBookingLoading(true);
      const bookingData = {
        boatId: id,
        date: selectedDate,
        time: selectedTime,
        seatIds: selectedSeats.map((seat) => seat._id),
      };

      console.log("Final booking data:", bookingData);

      const response = await api.post("/book-data", bookingData);
      console.log("Booking response:", response.data);
      setSuccess("Booking created successfully!");

      setTimeout(() => {
        navigate("/customer/boats");
      }, 1000);
    } catch (error) {
      console.log("Booking error:", error);
      console.log("Backend error:", error.response?.data);
      setError(error.response?.data?.message || "Booking creation failed");
    } finally {
      setBookingLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="booking-page">
        <div className="booking-empty">
          <h2>Preparing your booking</h2>

          <p>Fetching boat details...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="booking-page">
        <div className="booking-empty">
          <h2>{error || "Boat not found"}</h2>

          <p>We could not load this boat right now.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>

      <main className="booking-page">
        <div className="booking-shell">
          <header className="booking-header">
            <p className="booking-eyebrow">AQUAVOYAGE RESERVATIONS</p>

            <h1>Confirm your booking.</h1>

            <p>Review your seats and booking details.</p>
          </header>

          <section className="booking-card">
            {/* BOAT */}

            <div className="booking-card-top">
              <div>
                <p className="card-label">SELECTED BOAT</p>

                <h2>{data.boatName}</h2>
              </div>

              <span className={`booking-status ${data.status?.toLowerCase()}`}>
                {data.status}
              </span>
            </div>

            {/* IMAGE */}

            {data.image && (
              <img
                className="booking-boat-image"
                src={data.image}
                alt={data.boatName}
              />
            )}

            {/* BOAT DETAILS */}

            <div className="booking-details">
              <div className="booking-detail">
                <span>Boat type</span>

                <strong>{data.boatType}</strong>
              </div>

              <div className="booking-detail">
                <span>Category</span>

                <strong>{data.category}</strong>
              </div>

              <div className="booking-detail">
                <span>Facility</span>

                <strong>{data.facility}</strong>
              </div>

              <div className="booking-detail">
                <span>Capacity</span>

                <strong>{data.capacity} members</strong>
              </div>

              <div className="booking-detail">
                <span>Location</span>

                <strong>{data.location}</strong>
              </div>

              <div className="booking-detail">
                <span>Destination</span>

                <strong>{data.destination}</strong>
              </div>
            </div>

            {/* DATE */}

            <div className="booking-detail">
              <span>Booking Date</span>

              <strong>{selectedDate}</strong>
            </div>

            {/* TIME */}

            <div className="booking-detail">
              <span>Time</span>

              <strong>{selectedTime}</strong>
            </div>

            {/* SELECTED SEATS */}

            <div>
              <h3>Selected Seats</h3>

              {selectedSeats.length === 0 ? (
                <p>No seats selected</p>
              ) : (
                selectedSeats.map((seat) => (
                  <div key={seat._id}>
                    <span>Seat {seat.seatNumber}</span>

                    {" - "}

                    <strong>₹{seat.price}</strong>
                  </div>
                ))
              )}
            </div>

            {/* PASSENGERS */}

            <div className="booking-detail">
              <span>Number of passengers</span>

              <strong>{selectedSeats.length}</strong>
            </div>

            {/* TOTAL */}

            <div className="booking-total">
              <span>Reservation total</span>

              <strong>₹{totalAmount}</strong>
            </div>

            {/* ERROR */}

            {error && <p className="booking-message error-message">{error}</p>}

            {/* SUCCESS */}

            {success && (
              <p className="booking-message success-message">{success}</p>
            )}

            {/* CONFIRM */}

            <form onSubmit={handleSubmit}>
              <div className="form-actions">
                <button
                  className="book-now-button"
                  type="submit"
                  disabled={bookingLoading}
                >
                  {bookingLoading ? "Booking..." : "Confirm Booking"}

                  <span>→</span>
                </button>

                <button
                  className="cancel-button"
                  type="button"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
