import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NormalAdminNavbar.css";

export default function NormalAdminNavbar() {
  const navigate = useNavigate();

  const name = localStorage.getItem("normalAdminName");

  const user = JSON.parse(localStorage.getItem("user"))

  const permissions = user?.permissions || []

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("normalAdminId");
    localStorage.removeItem("normalAdminName");
    localStorage.removeItem("role");

    navigate("/");
  };

  return (
    <nav className="normal-navbar">
      <div className="navbar-logo">
        Boat Booking
      </div>

      <div className="navbar-links">
        <Link to="/adminHomePage">Home</Link>

       {permissions.includes("viewBoats")&& <Link to="/getBoats">My Boats</Link>}

        {permissions.includes("createBoat")&&<Link to="/addData">Add Boat</Link>}

        {permissions.includes("viewBookings") && <Link to="/normalAdminBookings">Bookings</Link>}
        <Link to="/normalAdminProfile">Profile</Link>
        {permissions.includes("manageCustomers") && <Link to="/customerPage">Customers</Link>}
      </div>

      <div className="navbar-right">
        <span>Welcome, {name}</span>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}