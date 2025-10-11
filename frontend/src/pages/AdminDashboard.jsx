import React, { useEffect, useState } from "react";
import API from "../api";
import FileUpload from "../components/FileUpload";

export default function AdminDashboard() {
  const [agents, setAgents] = useState([]);
  const [msg, setMsg] = useState("");
  const [uploadMsg, setUploadMsg] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminName");
    if (storedAdmin) setAdminName(storedAdmin);
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setMsg("Admin token missing. Please log in again.");
      return;
    }

    try {
      const res = await API.get("/admin/agents");
      setAgents(res.data);
    } catch (err) {
      console.error("Failed to fetch agents:", err.response?.data || err.message);
      setMsg("Failed to load agents. Unauthorized or server error.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    window.location.href = "/admin/login";
  };

  // ✅ Handle file upload with feedback and refresh
  const handleUpload = async (file) => {
    if (!file) {
      setUploadMsg("Please select a file first!");
      return;
    }

    setIsUploading(true);
    setUploadMsg("⏳ Uploading and distributing... Please wait.");

    const form = new FormData();
    form.append("file", file);

    try {
      const res = await API.post("/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadMsg("✅ " + res.data.message);
      await fetchAgents(); // 🔄 Refresh agent list automatically
    } catch (err) {
      console.error(err);
      setUploadMsg(err.response?.data?.message || "❌ Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f9fc" }}>
      {/* ✅ Top Navbar */}
      <div
        style={{
          background: "#1d4ed8",
          color: "white",
          padding: "12px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ margin: 0, fontWeight: "500", fontSize: "20px" }}>
          Admin Dashboard
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {adminName && (
            <span style={{ fontWeight: "500" }}>👑 {adminName}</span>
          )}
          <button
            onClick={handleLogout}
            style={{
              background: "white",
              color: "#1d4ed8",
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
          maxWidth: "900px",
          background: "white",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.06)",
        }}
      >
        <h3 style={{ marginBottom: "16px", color: "#1d4ed8" }}>
          👥 Agents Summary
        </h3>

        {msg && (
          <p style={{ color: "red", marginBottom: "12px" }}>{msg}</p>
        )}

        {/* ✅ Responsive 2-column grid layout for agent cards */}
        {agents.length === 0 ? (
          <p>No agents found yet.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "16px",
            }}
          >
            {agents.map((a) => (
              <div
                key={a._id}
                className="card"
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  padding: "16px 20px",
                  background: "#fafbff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  transition: "all 0.2s ease",
                }}
              >
                <strong style={{ color: "#1d4ed8", fontSize: "16px" }}>
                  {a.name}
                </strong>
                <p style={{ margin: "4px 0", color: "#333" }}>📧 {a.email}</p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#555",
                    background: "#f3f4f6",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    display: "inline-block",
                    marginTop: "6px",
                  }}
                >
                  Assigned: {a.assignedCount || 0}
                </p>
              </div>
            ))}
          </div>
        )}

        <hr style={{ margin: "30px 0" }} />
        <h3 style={{ color: "#1d4ed8" }}>📤 Upload CSV / XLSX File</h3>

        <div
          style={{
            marginTop: "10px",
            padding: "20px",
            border: "2px dashed #93c5fd",
            borderRadius: "10px",
            background: "#f9fbff",
          }}
        >
          <FileUpload onUpload={handleUpload} />
        </div>

        {isUploading && (
          <p style={{ color: "#2563eb", fontWeight: 500, marginTop: "8px" }}>
            Uploading... please wait ⏳
          </p>
        )}

        {uploadMsg && (
          <p
            style={{
              color: uploadMsg.includes("✅")
                ? "green"
                : uploadMsg.includes("❌")
                ? "red"
                : "#2563eb",
              marginTop: "8px",
              fontWeight: 500,
            }}
          >
            {uploadMsg}
          </p>
        )}
      </div>
    </div>
  );
}
