import React from "react";
import { Link } from "react-router-dom";
import "./style.css"; // custom styles

export default function Home() {
  return (
    <div className="home-container text-center">
      <h1 className="hero-title">Welcome to Exam Portal</h1>
      <p className="hero-subtitle">
        A modern platform for managing online examinations
      </p>
      <Link to="/login" className="hero-btn">
        Login
      </Link>
    </div>
  );
}
