// import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Services/api";
import "./Register.css";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const[errors, setErrors] = useState({})

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () =>{
    const newErrors = {}
    if (!data.name.trim()) {
      newErrors.name = "Name is required";
    } else if (data.name.trim().length < 3) {
      newErrors.name = "Name must contain at least 3 characters";
    }


    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    }

     if (!data.mobileNumber) {
      newErrors.mobileNumber = "Mobile number is required";
    }

    if(!data.password){
      newErrors.password = "password is required"
    }
    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validate()){
      return
    }

    try {
      const post = await api.post("/register", data);

      console.log(post.data);
      alert("form submitted Successfully");

      setData({
        name: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/customer/login");
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };
  return (
    <main className="register-page">
      <section className="register-panel" aria-labelledby="register-title">
        <div className="register-brand-mark" aria-hidden="true">
          KT
        </div>
        <p className="register-eyebrow">Kerala Tourism</p>
        <h1 id="register-title">Begin your journey</h1>
        <p className="register-subtitle">
          Create an account to discover Kerala your way.
        </p>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-field">
            <label htmlFor="register-name">Full name</label>
            <input
              id="register-name"
              type="text"
              name="name"
              value={data.name}
              placeholder="Your name"
              onChange={handleChange}
              autoComplete="name"
              
            />
            <span className="error">{errors.name}</span>
          </div>

          <div className="register-field">
            <label htmlFor="register-email">Email address</label>
            <input
              id="register-email"
              type="email"
              name="email"
              value={data.email}
              placeholder="you@example.com"
              onChange={handleChange}
              autoComplete="email"
              
            />
            <span className="error">{errors.email}</span>
          </div>

          <div className="register-field">
            <label htmlFor="register-mobile">Mobile number</label>
            <input
              id="register-mobile"
              type="tel"
              name="mobileNumber"
              value={data.mobileNumber}
              placeholder="10 digit mobile number"
              onChange={handleChange}
              autoComplete="tel"
              
            />
            <span className="error">{errors.mobileNumber}</span>
          </div>

          <div className="register-password-row">
            <div className="register-field">
              <label htmlFor="register-password">Password</label>
              <input
                id="register-password"
                type="password"
                name="password"
                value={data.password}
                placeholder="Create a password"
                onChange={handleChange}
              />
              <span className="error">{errors.password}</span>
            </div>

            <div className="register-field">
              <label htmlFor="register-confirm-password">
                Confirm password
              </label>
              <input
                id="register-confirm-password"
                type="password"
                name="confirmPassword"
                value={data.confirmPassword}
                placeholder="Re Enter password"
                onChange={handleChange}
              />
              <span className="error">{errors.confirmPassword}</span>
            </div>
          </div>

          <button className="register-button" type="submit">
            Create account
          </button>
        </form>

        <p className="register-login-prompt">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}
