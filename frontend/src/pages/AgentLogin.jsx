import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
 

export default function AgentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/agent/login", { email, password });
      localStorage.setItem("agentToken", res.data.token);
      setMsg("✅ Login successful");
      setTimeout(() => navigate("/agent/dashboard"), 1000);
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="container" style={{ maxWidth: "400px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "16px" }}>Agent Login</h2>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        {msg && (
          <p
            style={{
              marginTop: "10px",
              textAlign: "center",
              color: msg.includes("✅") ? "green" : "red",
              fontWeight: 500,
            }}
          >
            {msg}
          </p>
        )}

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "14px",
            color: "#555",
          }}
        >
          Not registered?{" "}
          <a
            href="/agent/register"
            style={{ color: "#2563eb", textDecoration: "none", fontWeight: "bold" }}
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
