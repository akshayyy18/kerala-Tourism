import React, { useState } from "react";
import api from "../../Services/api";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "superAdmin",
  });

  const [error, setError] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    }

    setError(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      let url = "";
      if (data.role === "superAdmin") {
        url = "/admin/login-admin";
      } else {
        url = "/admin/login-normal-admin";
      }

      const response = await api.post(url, {
        email: data.email,
        password: data.password,
      });

      console.log("Login Response:", response.data);

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.data));

      alert("Login successful");

      if (response.data.data.role === "superAdmin") {
        navigate("/admin");
      } else if (response.data.data.role === "normalAdmin") {
        navigate("/adminHomePage");
      }
    } catch (error) {
      console.log(error);

      setError({
        general: error.response?.data?.message || "Login failed",
      });
    }
  };

  return (
    <main className="admin-login-page">
      <section
        className="admin-login-panel"
        aria-labelledby="admin-login-title"
      >
        <div className="admin-login-mark">KT</div>

        <p className="admin-login-eyebrow">Kerala Tourism</p>

        <h1 id="admin-login-title">Admin Portal</h1>

        <p className="admin-login-subtitle">
          Sign in to manage boats, bookings, and guests.
        </p>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          {/* ROLE */}
          <div className="admin-login-field">
            <label htmlFor="role">Login As</label>

            <select
              id="role"
              name="role"
              value={data.role}
              onChange={handleChange}
            >
              <option value="superAdmin">Super Admin</option>

              <option value="normalAdmin">Normal Admin</option>
            </select>
          </div>

          {/* EMAIL */}
          <div className="admin-login-field">
            <label htmlFor="login-email">Email address</label>

            <input
              id="login-email"
              type="email"
              name="email"
              value={data.email}
              placeholder="admin@example.com"
              onChange={handleChange}
            />

            <span className="error">{error.email}</span>
          </div>

          {/* PASSWORD */}
          <div className="admin-login-field">
            <label htmlFor="login-password">Password</label>

            <input
              id="login-password"
              type="password"
              name="password"
              value={data.password}
              placeholder="Enter your password"
              onChange={handleChange}
            />

            <span className="error">{error.password}</span>

            <span className="error">{error.general}</span>
          </div>

          <button className="admin-login-button" type="submit">
            Sign in to dashboard
          </button>
        </form>
      </section>
    </main>
  );
}
