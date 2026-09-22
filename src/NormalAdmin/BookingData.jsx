import React, { useEffect, useState } from 'react'
import api from '../Services/api'
import NormalAdminNavbar from './NormalAdminNavbar'

export default function BookingData() {
    const [data,setData] = useState([])

    const user = JSON.parse(localStorage.getItem("user"))

    const permissions = user?.permissions || []

    const getData = async()=>{
        try{
            const response = await api.get("/getAll")
            setData(response.data.data)
        }catch(error){
            console.log(error.message)
        }
    }

    useEffect(()=>{
        getData()
    },[])

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
  return (
    <div>
        <NormalAdminNavbar/>
      <h2>Booking Details</h2>
      {data.length === 0 ? (
        <p>You are not authorized for this page or you don't have an access</p>
      ) : (
        data.map((booking) => (
          <div key={booking._id}>
            <p>Booking ID: {booking._id}</p>
            <p>Customer: {booking.customerName}</p>
            <p>Boat: {booking.boatName}</p>
             <p>Date: {new Date(booking.date).toLocaleDateString("en-GB")}</p> 
            <p>Time: {booking.time}</p>
            <p>Passengers: {booking.passengers}</p>
            <p>Amount: ₹{booking.amount}</p>
            { permissions.includes("manageBookings") && <select value={booking.status} onChange={(e)=> updateStatus(booking._id,e.target.value)}>
              <option value="">Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>}
            <hr />
          </div>
        ))
      )}

    </div>
  )
}
