import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  // Decide which token to use based on current URL
  const isAgentRoute = window.location.pathname.includes("/agent");
  const isAdminRoute = window.location.pathname.includes("/admin");

  let token = null;
  if (isAgentRoute) token = localStorage.getItem("agentToken");
  else if (isAdminRoute) token = localStorage.getItem("adminToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
