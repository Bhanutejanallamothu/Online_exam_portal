import React from "react";
import { Button } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <h2 className="login-title">Choose Login Type</h2>
      <div className="login-options">
        <Button
          variant="contained"
          startIcon={<AdminPanelSettingsIcon />}
          className="login-btn"
          onClick={() => navigate("/admin-login")}
        >
          Admin Login
        </Button>

        <Button
          variant="contained"
          startIcon={<MenuBookIcon />}
          className="login-btn"
          onClick={() => navigate("/teacher-login")}
        >
          Teacher Login
        </Button>

        <Button
          variant="contained"
          startIcon={<SchoolIcon />}
          className="login-btn"
          onClick={() => navigate("/student-login")}
        >
          Student Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
