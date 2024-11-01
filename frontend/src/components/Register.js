import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChanged = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.username || !formData.email || !formData.password) {
        alert("All fields are required");
        return;
      }
      await axios.post("http://localhost:5000/auth/register", formData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("user registered successfully");
      navigate("/");
    } catch (error) {
      console.error(
        "Error registering user: ",
        error.response ? error.response.data : error.message
      );
      alert(
        `Error: ${error.response ? error.response.data.error : "server error"}`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        onChange={handleChanged}
        placeholder="Username"
      />
      <input
        type="email"
        name="email"
        onChange={handleChanged}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        onChange={handleChanged}
        placeholder="Password"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
