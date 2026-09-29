import React, { useEffect, useState } from "react";
import api from "../Services/api";
import NormalAdminNavbar from "./NormalAdminNavbar";
import "./BookingData.css";

export default function BookingData() {
  const [data, setData] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const permissions = user?.permissions || [];

  const getData = async () => {
    try {
      const response = await api.get("/getAll");

      console.log(response.data)
      setData(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const update = await api.put(`/updateStatus/${id}`, {
        bookingStatus: status,
      });
      console.log(update.data);

      setData((prev) =>
        prev.map((book) =>
          book._id === id ? { ...book, bookingStatus: status } : book,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async(id)=>{
     const confirmDelete = window.confirm(
      "Are you sure you want to delete this boat?",
    );

    if (!confirmDelete) {
      return;
    }
    try{
      const response = await api.delete(`/admin/deleteCustomer/${id}`)

      console.log(response.data)

      setData((previousData)=> previousData.filter((boat)=> boat._id !== id))

      alert("deleted Successfull")
    }catch(error){
      console.log(error.message)
    }
  }
  return (
    <div className="booking-data-page">
      <NormalAdminNavbar />

      <div className="booking-data-container">
        <div className="booking-data-header">
          <span className="booking-data-tag">Bookings</span>
          <h1>Booking Details</h1>
        </div>

        {data.length === 0 ? (
          <div className="booking-empty-state">
            <h3>No bookings available</h3>
            <p>
              You are not authorized for this page or you don't have access.
            </p>
          </div>
        ) : (
          <div className="booking-data-grid">
            {data.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-card-header">
                  <div>
                    <span className="booking-id-label">Booking ID</span>
                    <h3>{booking._id.slice(-6).toUpperCase()}</h3>
                  </div>
                  <span
                    className={`booking-status-badge ${String(booking.bookingStatus || "pending").toLowerCase()}`}
                  >
                    {booking.bookingStatus || "Pending"}
                  </span>
                </div>

                <div className="booking-details-list">
                  <div className="booking-detail-row">
                    <span>Customer</span>
                    <strong>{booking.customerName}</strong>
                  </div>
                  <div className="booking-detail-row">
                    <span>Email</span>
                    <strong>{booking.customerId?.email}</strong>
                  </div>
                  <div className="booking-detail-row">
                    <span>Boat</span>
                    <strong>{booking.boatName}</strong>
                  </div>
                  <div className="booking-detail-row">
                    <span>Date</span>
                    <strong>
                      {new Date(booking.date).toLocaleDateString("en-GB")}
                    </strong>
                  </div>
                  <div className="booking-detail-row">
                    <span>Time</span>
                    <strong>{booking.time}</strong>
                  </div>
                  <div className="booking-detail-row">
                    <span>Passengers</span>
                    <strong>{booking.passengers}</strong>
                  </div>
                  <div className="booking-detail-row amount-row">
                    <span>Amount</span>
                    <strong>₹{booking.amount}</strong>
                  </div>
                  <div className="booking-detail-row">
                    <span>Seat no</span>
                    <p>{booking.seatIds?.map((seat)=> seat.seatNumber).join(",")}</p>
                  </div>
                </div>

                {permissions.includes("manageBookings") && (
                  <div className="booking-action-box">
                    <label htmlFor={`status-${booking._id}`}>
                      Update status
                    </label>
                    <select
                      id={`status-${booking._id}`}
                      className="booking-status-select"
                      value={booking.bookingStatus || ""}
                      onChange={(e) =>
                        updateStatus(booking._id, e.target.value)
                      }
                    >
                      <option value="">Status</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Completed">Completed</option>
                    </select>
                    {permissions.includes("manageBookings") && (
                      <button onClick={() => handleDelete(booking._id)}>
                        Delete Booking
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
