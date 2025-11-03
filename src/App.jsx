import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainNavBar from "./main/MainNavBar";
import AdminNavBar from "./admin/AdminNavBar";
import StudentNavBar from "./student/StudentNavBar";
import TeacherNavBar from "./teacher/TeacherNavBar";
import { AuthProvider, useAuth } from "./contextapi/AuthContext";

// Pages
import Home from "./main/Home";
import Login from "./main/Login";
import StudentLogin from "./student/StudentLogin";
import TeacherLogin from "./teacher/TeacherLogin";
import AdminLogin from "./admin/AdminLogin";

// Dashboards
import StudentDashboard from "./student/StudentDashboard";
import TeacherDashboard from "./teacher/TeacherDashboard";
import AdminDashboard from "./admin/AdminDashBoard";

function AppContent() {
  const { isAdminLoggedIn, isStudentLoggedIn, isTeacherLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      {/* Navbar changes depending on who is logged in */}
      {isAdminLoggedIn ? (
        <AdminNavBar />
      ) : isStudentLoggedIn ? (
        <StudentNavBar />
      ) : isTeacherLoggedIn ? (
        <TeacherNavBar />
      ) : (
        <MainNavBar />
      )}

      {/* ✅ Only Routes should render pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/teacherdashboard" element={<TeacherDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
