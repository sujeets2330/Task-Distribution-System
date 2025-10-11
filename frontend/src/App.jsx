import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminDashboard from "./pages/AdminDashboard";
import AgentLogin from "./pages/AgentLogin";
import AgentRegister from "./pages/AgentRegister";
import AgentDashboard from "./pages/AgentDashboard";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <Routes>
      {/* 🏠 Landing Page */}
      <Route path="/" element={<Home />} />

      {/* Admin Routes */}
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      {/* Agent Routes */}
      <Route path="/agent/register" element={<AgentRegister />} />
      <Route path="/agent/login" element={<AgentLogin />} />
      <Route
        path="/agent/dashboard"
        element={
          <PrivateRoute>
            <AgentDashboard />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
