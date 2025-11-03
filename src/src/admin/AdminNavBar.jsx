import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDashBoard from './AdminDashBoard';
import AddCourse from './AddCourse';
import UpdateCourse from './UpdateCourse';
import ViewCourses from './ViewCourses';
import AddTeacher from './AddTeacher';
import ViewTeachers from './ViewTeachers';
import ViewStudents from './ViewStudents';
import ViewExams from './ViewExams';
import ViewExamResults from './ViewExamResults';
import AdminLogin from './AdminLogin';

export default function AdminNavBar() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    navigate('/adminlogin');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/dashboard">Admin Panel</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#adminNav"
            aria-controls="adminNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="adminNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>

              {/* Courses */}
              <li className="nav-item"><Link className="nav-link" to="/courses">Courses</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/add-course">Add Course</Link></li>

              {/* Teachers */}
              <li className="nav-item"><Link className="nav-link" to="/teachers">Teachers</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/add-teacher">Add Teacher</Link></li>

              <li className="nav-item"><Link className="nav-link" to="/students">Students</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/exams">Exams</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/results">Results</Link></li>

              <li className="nav-item">
                <Link className="nav-link text-danger" to="/adminlogin" onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/dashboard" element={<AdminDashBoard />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/update-course/:id" element={<UpdateCourse />} />
        <Route path="/courses" element={<ViewCourses />} />
        <Route path="/add-teacher" element={<AddTeacher />} />
        <Route path="/teachers" element={<ViewTeachers />} />
        <Route path="/students" element={<ViewStudents />} />
        <Route path="/exams" element={<ViewExams />} />
        <Route path="/results" element={<ViewExamResults />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
      </Routes>
    </div>
  );
}
