import React, { use, useEffect, useState } from "react";
import api from "../Services/api";
import { useParams } from "react-router-dom";

export default function BookingHistory() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const getBookings = async () => {
    try {
      const respose = await api.get(`/admin/getBookings/${id}`);

      console.log(respose.data);

      setData(respose.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getBookings();
  }, [id]);

  return (
    <div>
      <h1>Recent Booking History</h1>
      {data.map((booking) => (
        <div key={booking._id}>
          <p>
            <strong>Boat Name:</strong> {booking.boatId?.boatName}
          </p>
          <p>
            <strong>Boat Type:</strong> {booking.boatId?.boatType || "-"}
          </p>
          <p>
            <strong>Category:</strong> {booking.boatId?.category || "-"}
          </p>
          <p>
            <strong>Location:</strong> {booking.boatId?.location || "-"}
          </p>
          {/* <p>
            <strong>Destination:</strong> {booking.boatId?.destination || "-"}
          </p> */}
          <p>
            <strong>Booking Date:</strong>{" "}
            {booking.date
              ? new Date(booking.date).toLocaleDateString("en-GB")
              : "-"}
          </p>
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
        </div>
      ))}
    </div>
  );
}
