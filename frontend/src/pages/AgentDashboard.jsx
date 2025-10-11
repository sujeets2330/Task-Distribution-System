import React, { useEffect, useState } from "react";
import API from "../api";

export default function AgentDashboard() {
  const [tasks, setTasks] = useState([]);
  const [msg, setMsg] = useState("");
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    // ✅ Get agent info from token (stored when logged in)
    const storedAgent = localStorage.getItem("agentName");
    if (storedAgent) setAgent(storedAgent);

    const fetchTasks = async () => {
      try {
        const res = await API.get("/agent/tasks");
        if (res.data.tasks) setTasks(res.data.tasks);
        else if (Array.isArray(res.data)) setTasks(res.data);
        else setMsg(res.data.message || "No tasks found");
      } catch (err) {
        setMsg(err.response?.data?.message || "Failed to load tasks");
      }
    };

    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("agentToken");
    localStorage.removeItem("agentName");
    window.location.href = "/agent/login";
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f9fc" }}>
      {/* ✅ Top Navbar */}
      <div
        style={{
          background: "#2563eb",
          color: "white",
          padding: "12px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ margin: 0, fontWeight: "500", fontSize: "20px" }}>
          Agent Dashboard
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {agent && (
            <span style={{ fontWeight: "500" }}>👤 {agent}</span>
          )}
          <button
            onClick={handleLogout}
            style={{
              background: "white",
              color: "#2563eb",
              border: "none",
              borderRadius: "8px",
              padding: "6px 14px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* ✅ Main Content */}
      <div
        className="container"
        style={{
          marginTop: "40px",
          maxWidth: "700px",
          background: "white",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.06)",
        }}
      >
        <h3 style={{ marginBottom: "16px" }}>Assigned Tasks</h3>
        {msg && (
          <p style={{ color: "red", marginBottom: "12px" }}>
            {msg}
          </p>
        )}
        {tasks.length === 0 ? (
          <p>No tasks assigned yet.</p>
        ) : (
          <div>
            {tasks.map((t, i) => (
              <div
                key={i}
                className="card"
                style={{
                  border: "1px solid #eee",
                  borderRadius: "10px",
                  padding: "14px",
                  marginBottom: "10px",
                  transition: "all 0.2s ease",
                  background: "#fafbff",
                }}
              >
                <strong style={{ color: "#2563eb", fontSize: "16px" }}>
                  {t.firstName || "Unnamed"}
                </strong>
                <p style={{ margin: "4px 0", color: "#333" }}>
                  📞 {t.phone || "N/A"}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    background: "#f3f4f6",
                    padding: "6px 10px",
                    borderRadius: "6px",
                  }}
                >
                  {t.notes || "No additional notes"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
