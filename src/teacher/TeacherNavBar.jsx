import React, { useEffect } from 'react';
import { Link, Outlet, Routes, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../contextapi/AuthContext';

// Import Teacher pages/components
import TeacherDashboard from './TeacherDashboard';
import ExamSchedule from './ExamSchedule';
import StudentExamResult from './StudentExamResult';
import StudentRegistration from './StudentRegistration';
import TeacherProfile from './TeacherProfile';
import UpcomingExams from './UpcomingExams';
import ViewAllStudents from './ViewAllStudents';

export default function TeacherNavBar() {
  const navigate = useNavigate();
  const { isTeacherLoggedIn, setIsTeacherLoggedIn } = useAuth();

  useEffect(() => {
    if (!isTeacherLoggedIn) {
      navigate('/teacher-login');
    }
  }, [isTeacherLoggedIn, navigate]);

  const handleLogout = () => {
    setIsTeacherLoggedIn(false);
    navigate('/teacher-login');
  };

  if (!isTeacherLoggedIn) return null;

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/teacherdashboard">Teacher Portal</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#teacherNav"
            aria-controls="teacherNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="teacherNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/teacherdashboard">Dashboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/exam-schedule">Exam Schedule</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/upcoming-exams">Upcoming Exams</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/student-registration">Add Student</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/student-results">Student Results</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/view-students">All Students</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/teacher-profile">Profile</Link></li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-danger"
                  style={{ textDecoration: 'none' }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Nested Routes */}
      <Routes>
        <Route path="/teacherdashboard" element={<TeacherDashboard />} />
        <Route path="/exam-schedule" element={<ExamSchedule />} />
        <Route path="/upcoming-exams" element={<UpcomingExams />} />
        <Route path="/student-registration" element={<StudentRegistration />} />
        <Route path="/student-results" element={<StudentExamResult />} />
        <Route path="/view-students" element={<ViewAllStudents />} />
        <Route path="/teacher-profile" element={<TeacherProfile />} />
      </Routes>

      {/* Outlet for further nested routing if needed */}
      <Outlet />
    </>
  );
}
