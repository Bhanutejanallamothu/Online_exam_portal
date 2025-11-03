import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from '../config';

export default function StudentRegistration() {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    department: '',
    course: '',
    dob: ''
  });

 const handleSubmit = (e) => {
  e.preventDefault();
  console.log(student); // <-- check values
  axios.post(`${config.url}/teacher/student`, student)
    .then(() => {
      toast.success('Student added successfully!');
      setStudent({ name: '', email: '', password: '', phone: '', department: '', course: '', dob: '' });
    })
    .catch((err) => {
      console.error(err.response?.data || err.message);
      toast.error('Failed to add student');
    });
};


  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card shadow-lg rounded-4 p-4" style={{ maxWidth: '650px', width: '100%' }}>
        <h3 className="text-center mb-4 text-primary fw-bold">Add Student</h3>
        <form onSubmit={handleSubmit} className="row g-3">

          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control shadow-sm"
              value={student.name}
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control shadow-sm"
              value={student.email}
              onChange={(e) => setStudent({ ...student, email: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input type="password" className="form-control shadow-sm"
              value={student.password}
              onChange={(e) => setStudent({ ...student, password: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            <input type="tel" className="form-control shadow-sm"
              value={student.phone}
              onChange={(e) => setStudent({ ...student, phone: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Department</label>
            <input type="text" className="form-control shadow-sm"
              value={student.department}
              onChange={(e) => setStudent({ ...student, department: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Course</label>
            <input type="text" className="form-control shadow-sm"
              value={student.course}
              onChange={(e) => setStudent({ ...student, course: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Date of Birth</label>
            <input type="date" className="form-control shadow-sm"
              value={student.dob}
              onChange={(e) => setStudent({ ...student, dob: e.target.value })}
              required
            />
          </div>

          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-primary w-100 shadow-sm fw-semibold">
              ➕ Add Student
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}
