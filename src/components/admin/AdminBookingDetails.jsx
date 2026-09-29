import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Services/api";

export default function AdminBookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate()

  const [book, setBook] = useState(null);

  const getbook = async () => {
    try {
      // console.log("Booking ID from URL:", id);

      const response = await api.get(`/getSingleBooking/${id}`);

      setBook(response.data.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getbook();
  }, [id]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Booking Details</h2>

      <p><strong>Customer: </strong> {book.customerName}</p>

      <p><strong>Boat: </strong>{book.boatName}</p>

      <p><strong>Status: </strong>{new Date(book.date).toLocaleDateString("en-GB")}</p>

      <p><strong>Time: </strong>{book.time}</p>

      <p><strong>Passengers:  </strong>{book.passengers}</p>

      <p><strong>Amount:</strong> ₹{book.amount}</p>

      <p><strong>Status: </strong>{book.bookingStatus}</p>
      <p><strong>Seat No: </strong>{book.seatIds?.map((seat)=> seat.seatNumber).join(",")}</p>

        <p><strong>Total Price:</strong> ₹{book?.amount || 0}</p>

      <button onClick={()=> navigate(`/admin/viewCustomer/${book.customerId._id}`)}>View Booking History</button>
    </div>
  );
}
