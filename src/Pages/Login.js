import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Services/api";
import "./Login.css";

export default function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!login.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!login.password.trim()) {
      newErrors.password = "Password is required";
    } else if (login.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isvalid = validateForm();
    if (!isvalid) {
      return;
    }

    try {
      const response = await api.post("/login", login);

      // console.log(response.data)

      const token = response.data.token;
      localStorage.setItem("token", token);
      // console.log(token)

      const user = response.data.data;

      localStorage.setItem("user", JSON.stringify(user));
      navigate("/customer");
      alert("login successfull");
    } catch (error) {
      console.log(error.message);
      // alert(error.message);
      setErrors({
        general: error.response?.data?.message,
      });
    }
  };
  return (
    <main className="login-page">
      <section className="login-panel" aria-labelledby="login-title">
        <div className="login-brand-mark" aria-hidden="true">
          KT
        </div>
        <p className="login-eyebrow">Kerala Tourism</p>
        <h1 id="login-title">Welcome back</h1>
        <p className="login-subtitle">
          Sign in to continue your Kerala journey.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              type="email"
              name="email"
              value={login.email}
              placeholder="you@example.com"
              onChange={handleChange}
            />
            <span className="error">{errors.email}</span>
          </div>

          <div className="login-field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              name="password"
              value={login.password}
              placeholder="Enter your password"
              onChange={handleChange}
            />
            <span className="error">{errors.password}</span>
            <span className="error">{errors.general}</span>
          </div>

          <button className="login-button" type="submit">
            Login
          </button>
        </form>

        <p className="login-register-prompt">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </section>
    </main>
  );
}
