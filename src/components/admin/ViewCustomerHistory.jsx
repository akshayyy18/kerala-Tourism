import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../Services/api";

export default function ViewCustomerHistory() {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);

  const getCustomer = async () => {
    try {
      console.log("Customer ID from URL:", id);

      const response = await api.get(`/admin/getBookings/${id}`);
      console.log(response.data);
      setBookings(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCustomer();
  }, [id]);



  return (
    <div>
      <h1>Recent Booking History</h1>
      {bookings.map((booking) => (
        <div key={booking._id}>
            <strong>Boat Name:</strong> {booking.boatId?.boatName}

          <p>
            <strong>Boat Type:</strong> {booking.boatId?.boatType || "-"}
          </p>

          <p>
            <strong>Category:</strong> {booking.boatId?.category || "-"}
          </p>

          <p>
            <strong>Location:</strong> {booking.boatId?.location || "-"}
          </p>

          <p>
            <strong>Destination:</strong> {booking.boatId?.destination || "-"}
          </p>

          {/* Booking Date */}
          <p>
            <strong>Booking Date:</strong>{" "}
            {booking.date
              ? new Date(booking.date).toLocaleDateString("en-GB")
              : "-"}
          </p>

          {/* Booking Time */}
          <p>
            <strong>Time:</strong> {booking.time || "-"}
          </p>

          <p>
            <strong>Passengers:</strong> {booking.passengers}
          </p>

          <p>
            <strong>Amount:</strong> ₹{booking.amount}
          </p>

          <p>
            <strong>Status:</strong> {booking.bookingStatus}
          </p>

          <hr />
          {/* <button onClick={()=>handleDelete(booking._id)}>Delete History</button> */}
        </div>
      ))}
    </div>
  );
}
