import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from '../config';

export default function AddTeacher() {
  const [teacher, setTeacher] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    department: '',
    subject: '',
    qualification: '',
    experience: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${config.url}/admin/teachers`, teacher)
      .then(() => {
        toast.success('Teacher added successfully!');
        setTeacher({
          name: '',
          email: '',
          password: '',
          phone: '',
          department: '',
          subject: '',
          qualification: '',
          experience: ''
        });
      })
      .catch(() => toast.error('Failed to add teacher'));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="card shadow-lg border-0 rounded-3" style={{ width: '100%', maxWidth: '650px' }}>
        <div className="card-body p-4">
          <h3 className="text-center mb-4 text-primary fw-bold">Add Teacher</h3>
          <form onSubmit={handleSubmit} className="row g-3">

            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control shadow-sm"
                value={teacher.name}
                onChange={(e) => setTeacher({ ...teacher, name: e.target.value })}
                required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input type="email" className="form-control shadow-sm"
                value={teacher.email}
                onChange={(e) => setTeacher({ ...teacher, email: e.target.value })}
                required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input type="password" className="form-control shadow-sm"
                value={teacher.password}
                onChange={(e) => setTeacher({ ...teacher, password: e.target.value })}
                required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Phone Number</label>
              <input type="tel" className="form-control shadow-sm"
                value={teacher.phone}
                onChange={(e) => setTeacher({ ...teacher, phone: e.target.value })}
                required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Department</label>
              <input type="text" className="form-control shadow-sm"
                value={teacher.department}
                onChange={(e) => setTeacher({ ...teacher, department: e.target.value })}
                required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Subject Specialization</label>
              <input type="text" className="form-control shadow-sm"
                value={teacher.subject}
                onChange={(e) => setTeacher({ ...teacher, subject: e.target.value })}
                required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Qualification</label>
              <input type="text" className="form-control shadow-sm"
                value={teacher.qualification}
                onChange={(e) => setTeacher({ ...teacher, qualification: e.target.value })}
                required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Experience (Years)</label>
              <input type="number" className="form-control shadow-sm"
                value={teacher.experience}
                onChange={(e) => setTeacher({ ...teacher, experience: e.target.value })}
                required />
            </div>

            <div className="col-12 mt-3">
              <button type="submit" className="btn btn-primary w-100 shadow-sm fw-semibold">
                ➕ Add Teacher
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}
