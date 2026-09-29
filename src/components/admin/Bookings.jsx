import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

export default function Bookings() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const getBooking = async () => {
    try {
      const response = await api.get("/getall");

      console.log("Booking response:", response.data);

      setData(response.data.data);
    } catch (error) {
      console.log("Booking error:", error);

      setError(error.response?.data?.message || "Unable to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBooking();
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

  if (loading) {
    return (
      <div>
        <h2>Loading bookings...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Bookings</h1>

        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }
  return (
    <div>
      <AdminNavbar />
      {/* <h1>Bookings</h1> */}
      <button onClick={() => navigate(-1)}>Back</button>

      {data.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              {/* <th>CustomerId</th> */}
              <th>Customer</th>
              <th>Mobile</th>
              <th>Boat</th>
              <th>Date</th>
              <th>Time</th>
              <th>Passengers</th>
              <th>Amount</th>
              <th>Status</th>
              <th>SeatNo</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((book) => (
              <tr key={book._id}>
                {/* <td>{book?.custometId}</td> */}
                <td>{book.customerName || "-"}</td>
                <td>{book.mobileNumber || "-"}</td>
                <td>{book.boatId?.boatName || book.boatName || "-"}</td>
                <td>
                  {book.date ? new Date(book.date).toLocaleDateString() : "-"}
                </td>
                <td>{book.time || "-"}</td>
                <td>{book.passengers || "-"}</td>
                <td>₹{book.amount || 0}</td>
                {/* <td>{book.bookingStatus || "Pending"}</td> */}
                <td>
                  <select
                    value={book.bookingStatus}
                    onChange={(e) => updateStatus(book._id, e.target.value)}
                  >
                    <option value="">Status</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td>{book.seatIds?.map((seat)=> seat.seatNumber).join(",")}</td>
                

                <td>
                  <button
                    onClick={() =>
                      navigate(`/admin/bookingDetails/${book._id}`)
                    }
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
