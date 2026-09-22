import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-brand">
        <span className="admin-brand-mark" aria-hidden="true">
          KB
        </span>
        <div>
          <h2>Kerala Boat Tourism</h2>
          <span>Management portal</span>
        </div>
      </div>

      <div className="admin-navbar-links">
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/boats">Boats</Link>
        <Link to="/admin/add-boat">Add Boat</Link>
        <Link to="/admin/booking">Bookings</Link>
        <Link to="/admin/customers">Customers</Link>
        <Link to="/admin/profile">Profile</Link>
        <Link to="/admin/creation">Admins</Link>
        <button className="admin-logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
