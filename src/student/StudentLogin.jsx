import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from '../config';
import { useAuth } from '../contextapi/AuthContext'; // ✅ Import AuthContext

export default function StudentLogin() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { setIsStudentLoggedIn } = useAuth(); // ✅ Context setter

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${config.url}/student/login`, credentials);

      const data = res.data;

      if (data && data.id) { // backend returns student object
        // Save student info in sessionStorage
        sessionStorage.setItem('studentId', data.id);
        sessionStorage.setItem('studentName', data.name);

        // ✅ Update AuthContext to trigger navbar change immediately
        setIsStudentLoggedIn(true);

        toast.success('Login successful!');
        navigate('/studentdashboard');
      } else {
        toast.error('Invalid login response');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error('Invalid email or password');
      } else {
        toast.error('Server error during login, please try again later.');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <ToastContainer position="top-center" />
      <div className="card shadow-lg rounded-4 p-5" style={{ maxWidth: '450px', width: '100%' }}>
        <h3 className="text-center mb-4 text-primary fw-bold">Student Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control shadow-sm"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
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
