import React, { useState } from "react";
import api from "../Services/api";
import { useNavigate } from "react-router-dom";

export default function NormalLogin() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/logged", data);
      console.log(response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("normalAdminId", response.data.id);
      localStorage.setItem("normalAdminName", response.data.name);
      localStorage.setItem("role", response.data.role);

      alert("login successfull")
      // setData(response.data.data);
      navigate("/adminHomePage");
    } catch (error) {
      console.log("error", error.message);
    }
  };
  return (
    <div>
      <h1>Normal Admin</h1>
      <label>Email:</label>
      <input
        name="email"
        value={data.email}
        type="email"
        placeholder="email"
        onChange={handleChange}
      />
      <br />
      <label>Password:</label>
      <input
        name="password"
        value={data.password}
        type="password"
        placeholder="password"
        onChange={handleChange}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
