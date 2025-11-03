import React from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../contextapi/AuthContext";  // ✅ import context
import AdminDashBoard from "./AdminDashBoard";
import AddCourse from "./AddCourse";
import UpdateCourse from "./UpdateCourse";
import ViewCourses from "./ViewCourses";
import AddTeacher from "./AddTeacher";
import ViewTeachers from "./ViewTeachers";
import ViewStudents from "./ViewStudents";
import ViewExams from "./ViewExams";
import ViewExamResults from "./ViewExamResults";
import AdminLogin from "./AdminLogin";

export default function AdminNavBar() {
  const navigate = useNavigate();
  const { setIsAdminLoggedIn } = useAuth();  // ✅ use context setter

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    setIsAdminLoggedIn(false);  // ✅ update context
    navigate("/");  // ✅ redirect to home
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/admin/dashboard">
            Admin Panel
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#adminNav"
            aria-controls="adminNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="adminNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/admin/dashboard">
                  Dashboard
                </Link>
              </li>

              {/* Courses */}
              <li className="nav-item">
                <Link className="nav-link" to="/admin/courses">
                  Courses
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/add-course">
                  Add Course
                </Link>
              </li>

              {/* Teachers */}
              <li className="nav-item">
                <Link className="nav-link" to="/admin/teachers">
                  Teachers
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/add-teacher">
                  Add Teacher
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/admin/students">
                  Students
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/exams">
                  Exams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/results">
                  Results
                </Link>
              </li>

              {/* Logout */}
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link text-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ✅ Admin routes under /admin/... */}
      <Routes>
        <Route path="/admin/dashboard" element={<AdminDashBoard />} />
        <Route path="/admin/add-course" element={<AddCourse />} />
        <Route path="/admin/update-course/:id" element={<UpdateCourse />} />
        <Route path="/admin/courses" element={<ViewCourses />} />
        <Route path="/admin/add-teacher" element={<AddTeacher />} />
        <Route path="/admin/teachers" element={<ViewTeachers />} />
        <Route path="/admin/students" element={<ViewStudents />} />
        <Route path="/admin/exams" element={<ViewExams />} />
        <Route path="/admin/results" element={<ViewExamResults />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </div>
  );
}
