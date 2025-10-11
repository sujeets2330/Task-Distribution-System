import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function AgentRegister() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/agent/register", form);
      setMsg(res.data.message);
      setTimeout(() => navigate("/agent/login"), 1000);
    } catch (err) {
      setMsg(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container">
      <h2>Agent Registration</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Phone" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit">Register</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
