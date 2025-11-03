import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import TeacherDashboard from './TeacherDashboard';
import ExamSchedule from './ExamSchedule';
import StudentExamResult from './StudentExamResult';
import StudentRegistration from './StudentRegistration';
import TeacherProfile from './TeacherProfile';
import UpcomingExams from './UpcomingExams';
import ViewAllStudents from './ViewAllStudents';
import TeacherLogin from './TeacherLogin';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TeacherNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/teacherlogin');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/teacherdashboard">Teacher Portal</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#teacherNav"
            aria-controls="teacherNav" aria-expanded="false" aria-label="Toggle navigation">
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
                <Link className="nav-link text-danger" onClick={handleLogout} to="/teacherlogin">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/teacherdashboard" element={<TeacherDashboard />} />
        <Route path="/exam-schedule" element={<ExamSchedule />} />
        <Route path="/upcoming-exams" element={<UpcomingExams />} />
        <Route path="/student-registration" element={<StudentRegistration />} />
        <Route path="/student-results" element={<StudentExamResult />} />
        <Route path="/view-students" element={<ViewAllStudents />} />
        <Route path="/teacher-profile" element={<TeacherProfile />} />
        <Route path="/teacherlogin" element={<TeacherLogin />} />
      </Routes>
    </div>
  );
}
