import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h2>Welcome to Work Distribution System</h2>
      <p>Select your role to continue</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
        <button onClick={() => navigate("/admin/login")}>Login as Admin</button>
        <button onClick={() => navigate("/agent/login")}>Login as Agent</button>
      </div>

      <p style={{ marginTop: "20px", color: "#555" }}>
        Don’t have an account?{" "}
        <span style={{ color: "#2563eb", cursor: "pointer" }} onClick={() => navigate("/admin/register")}>
          Register as Admin
        </span>{" "}
        |{" "}
        <span style={{ color: "#2563eb", cursor: "pointer" }} onClick={() => navigate("/agent/register")}>
          Register as Agent
        </span>
      </p>
    </div>
  );
}
