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

      <p>Customer: {book.customerName}</p>

      <p>Boat: {book.boatName}</p>

      <p>Date: {new Date(book.date).toLocaleDateString("en-GB")}</p>

      <p>Time: {book.time}</p>

      <p>Passengers: {book.passengers}</p>

      <p>Amount: ₹{book.amount}</p>

      <p>Status: {book.bookingStatus}</p>
      <button onClick={()=> navigate(`/admin/viewCustomer/${book.customerId._id}`)}>View Booking History</button>
    </div>
  );
}
