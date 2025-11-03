import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config";
import { useAuth } from "../contextapi/AuthContext";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { setIsAdminLoggedIn } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${config.url}/admin/login`, credentials)
      .then((res) => {
        const data = res.data;
        if (data.success) {
          sessionStorage.setItem("admin", JSON.stringify(data.admin));
          setIsAdminLoggedIn(true); // ✅ update context
          toast.success("Login successful!");
          navigate("/dashboard");   // ✅ go to admin dashboard
        } else {
          toast.error(data.message || "Invalid credentials");
        }
      })
      .catch(() => toast.error("Login failed!"));
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <ToastContainer position="top-center" />
      <div className="card shadow-lg rounded-4 p-4" style={{ maxWidth: "450px", width: "100%" }}>
        <h3 className="text-center mb-4 text-primary fw-bold">Admin Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control shadow-sm"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control shadow-sm"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 shadow-sm fw-semibold">
            🔑 Login
          </button>
        </form>
      </div>
    </div>
  );
}
