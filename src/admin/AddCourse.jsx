import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from '../config';

export default function AddCourse() {
  const [course, setCourse] = useState({
    name: '',
    code: '',
    duration: '',
    credits: '',
    department: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${config.url}/admin/courses`, course)
      .then(() => {
        toast.success('Course added successfully!');
        setCourse({
          name: '',
          code: '',
          duration: '',
          credits: '',
          department: '',
          description: ''
        });
      })
      .catch(() => toast.error('Failed to add course'));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="card shadow-lg border-0 rounded-4 p-4" style={{ width: '100%', maxWidth: '650px' }}>
        <h3 className="text-center mb-4 text-primary fw-bold">Add Course</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Course Name</label>
            <input
              type="text"
              className="form-control shadow-sm"
              value={course.name}
              onChange={(e) => setCourse({ ...course, name: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Course Code</label>
            <input
              type="text"
              className="form-control shadow-sm"
              value={course.code}
              onChange={(e) => setCourse({ ...course, code: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Duration</label>
            <input
              type="text"
              className="form-control shadow-sm"
              value={course.duration}
              onChange={(e) => setCourse({ ...course, duration: e.target.value })}
              placeholder="e.g. 6 months / 1 year"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Credits</label>
            <input
              type="number"
              className="form-control shadow-sm"
              value={course.credits}
              onChange={(e) => setCourse({ ...course, credits: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Department</label>
            <input
              type="text"
              className="form-control shadow-sm"
              value={course.department}
              onChange={(e) => setCourse({ ...course, department: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control shadow-sm"
              rows="3"
              value={course.description}
              onChange={(e) => setCourse({ ...course, description: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 shadow-sm fw-semibold">
            ➕ Add Course
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}
