import React, { useState } from "react";
import api from "../../Services/api";
import { useNavigate } from "react-router-dom";
import "./AdminRegistration.css";

export default function CreateNormalAdmin() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    permissions: [],
  });

  const [error, setError] = useState("");

  const permissionList = [
    {
      value: "viewBoats",
      label: "View Boats",
    },
    {
      value: "createBoat",
      label: "Create Boat",
    },
    {
      value: "updateBoat",
      label: "Update Boat",
    },
    {
      value: "deleteBoat",
      label: "Delete Boat",
    },
    {
      value: "viewBookings",
      label: "View Bookings",
    },
    {
      value: "manageBookings",
      label: "Manage Bookings",
    },
    {
      value: "manageCustomers",
      label: "Manage Customers",
    },
  ];

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handlePermissionChange = (permission) => {
    setData((prev) => {
      const alreadySelected = prev.permissions.includes(permission);

      if (alreadySelected) {
        return {
          ...prev,
          permissions: prev.permissions.filter((item) => item !== permission),
        };
      }

      return {
        ...prev,
        permissions: [...prev.permissions, permission],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!data.name || !data.email || !data.password || !data.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError("Password and confirm password do not match");
      return;
    }

    if (data.permissions.length === 0) {
      setError("Please select at least one permission");
      return;
    }

    try {
      const response = await api.post("/admin/create-normal-admin", data);

      console.log("Normal Admin Created:", response.data);

      alert("Normal Admin created successfully");

      navigate("/admin");
    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message || "Failed to create Normal Admin",
      );
    }
  };

  return (
    <div className="admin-registration-page">
       <button onClick={()=>navigate(-1)}>Back</button>
      <div className="admin-registration-shell">
        <div className="admin-registration-card">
          <div className="admin-registration-header">
            <p className="admin-registration-kicker">Admin access</p>
            <h1>Create Normal Admin</h1>
            <p>Set up a new admin account and assign permission access.</p>
          </div>

          {error && <div className="admin-registration-error">{error}</div>}

          <form className="admin-registration-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-field">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  placeholder="Enter admin name"
                />
              </div>

              <div className="form-field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </div>

              <div className="form-field">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                />
              </div>

              <div className="form-field">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                />
              </div>
            </div>

            <div className="permission-section">
              <h3>Access Permissions</h3>

              <div className="permission-grid">
                {permissionList.map((permission) => (
                  <label
                    key={permission.value}
                    className="permission-option"
                    htmlFor={permission.value}
                  >
                    <input
                      type="checkbox"
                      id={permission.value}
                      checked={data.permissions.includes(permission.value)}
                      onChange={() => handlePermissionChange(permission.value)}
                    />
                    <span>{permission.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="submit-btn" type="submit">
              Create Normal Admin
            </button>
           
          </form>
        </div>
      </div>
    </div>
  );
}
