import React, { useEffect, useState } from "react";
import api from "../Services/api";
import AdminNavbar from "../components/admin/AdminNavbar";

export default function Admin() {
  const [boats, setBoats] = useState([]);
  const [booking,setBooking] = useState([])
  const [search, setSearch] = useState("")

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const getBoats = async () => {
    try {
      const response = await api.get("/getBoat");

      console.log("Boats:", response.data);

      setBoats(response.data.data);
    } catch (error) {
      console.log("Get boats error:", error);

      setError(error.response?.data?.message || "Unable to fetch boats");
    } finally {
      setLoading(false);
    }
  };

  const getBookings = async() =>{
   try{
     const response = await api.get("/getall")

     console.log("fetched bookings", response.data)

     setBooking(response.data.data)
   }catch(error){
    console.log(error.message)
   }
  }

  useEffect(() => {
    getBoats();
    getBookings()
  }, []);


  const filterData = boats.filter((boat)=>{
    return boat.boatName?.toLowerCase().includes(search.toLowerCase())
  })
  const totalBoats = boats.length;

  const availableBoats = boats.filter(
    (boat) => boat.status === "Available",
  ).length;

  const bookedBoats = booking.filter((boat) => boat.bookingStatus === "Upcoming").length;

  const maintenanceBoats = boats.filter(
    (boat) => boat.status === "Maintenance",
  ).length;

  if (loading) {
    return (
      <div>
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>Admin Dashboard</h2>

        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <AdminNavbar/>
      <h1>Admin Dashboard</h1>
      <div>
        <div>
          <h3>Total Boats</h3>
          <h2>{totalBoats}</h2>
        </div>
        <div>
          <h3>Available Boats</h3>
          <h2>{availableBoats}</h2>
        </div>
        <div>
          <h3>Booked Boats</h3>

          <h2>{bookedBoats}</h2>
        </div>

        <div>
          <h3>Maintenance</h3>
          <h2>{maintenanceBoats}</h2>
        </div>
      </div>
      <div>
        <input placeholder="search Boats" className="inputFilter" value={search} onChange={(e)=> setSearch(e.target.value)}/>
      </div>

      <h2>Recent Boats</h2>

      <table>
        <thead>
          <tr>
            <th>Boat Name</th>
            <th>Type</th>
            <th>Category</th>
            <th>Facility</th>
            <th>Capacity</th>
            <th>Price</th>
            <th>Status</th>
            <th>CreatedBy</th>
          </tr>
        </thead>

        <tbody>
          {filterData.map((boat) => (
            <tr key={boat._id}>
              <td>{boat.boatName}</td>
              <td>{boat.boatType}</td>
              <td>{boat.category}</td>
              <td>{boat.facility}</td>
              <td>{boat.capacity}</td>
              <td>₹{boat.price}</td>
              <td>{boat.status}</td>
              <td>{boat.createdBy?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


