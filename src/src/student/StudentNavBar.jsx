import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import StudentProfile from './StudentProfile';
import ExamResults from './ExamResults';
import OngoingExams from './OngoingExams';
import ViewUpcomingExams from './ViewUpcomingExams';
import StudentLogin from './StudentLogin';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function StudentNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/studentlogin');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/studentdashboard">Student Portal</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#studentNav"
            aria-controls="studentNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="studentNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/studentdashboard">Dashboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/ongoing-exams">Ongoing Exams</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/exam-results">Exam Results</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/upcoming-exams">Upcoming Exams</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/student-profile">Profile</Link></li>
              <li className="nav-item"><Link className="nav-link text-danger" onClick={handleLogout} to="/studentlogin">Logout</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/studentdashboard" element={<OngoingExams />} />
        <Route path="/ongoing-exams" element={<OngoingExams />} />
        <Route path="/exam-results" element={<ExamResults />} />
        <Route path="/upcoming-exams" element={<ViewUpcomingExams />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
      </Routes>
    </div>
  );
}
