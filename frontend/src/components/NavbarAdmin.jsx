import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavbarAdmin() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("role");
    navigate("/");
  };
  return (
    <div className="nav">
      <h3>Admin Dashboard</h3>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
