import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from '../config';

export default function ExamSchedule() {
  const [courses, setCourses] = useState([]);
  const [exam, setExam] = useState({
    name: '',       // renamed to match backend
    courseId: '',
    date: '',
    startTime: '',
    endTime: ''
  });

  useEffect(() => {
    // Fetch courses from admin API
    axios.get(`${config.url}/admin/courses`)
      .then(res => setCourses(res.data))
      .catch(() => toast.error('Failed to fetch courses'));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare payload matching backend entity
    const payload = {
      name: exam.name,                    // matches Exam.name in backend
      date: exam.date,
      startTime: exam.startTime,
      endTime: exam.endTime,
      course: { id: parseInt(exam.courseId) } // course object with id
    };

    axios.post(`${config.url}/teacher/exam`, payload)
      .then(() => {
        toast.success('Exam scheduled successfully!');
        setExam({ name: '', courseId: '', date: '', startTime: '', endTime: '' });
      })
      .catch(() => toast.error('Failed to schedule exam'));
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card shadow-lg rounded-4 p-4" style={{ maxWidth: '600px', width: '100%' }}>
        <h3 className="text-center mb-4 text-primary fw-bold">Schedule Exam</h3>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-12">
            <label className="form-label">Exam Name</label>
            <input type="text" className="form-control shadow-sm"
              value={exam.name}
              onChange={(e) => setExam({ ...exam, name: e.target.value })}
              required
            />
          </div>

          <div className="col-md-12">
            <label className="form-label">Course</label>
            <select className="form-select shadow-sm"
              value={exam.courseId}
              onChange={(e) => setExam({ ...exam, courseId: e.target.value })}
              required
            >
              <option value="">Select Course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Date</label>
            <input type="date" className="form-control shadow-sm"
              value={exam.date}
              onChange={(e) => setExam({ ...exam, date: e.target.value })}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Start Time</label>
            <input type="time" className="form-control shadow-sm"
              value={exam.startTime}
              onChange={(e) => setExam({ ...exam, startTime: e.target.value })}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">End Time</label>
            <input type="time" className="form-control shadow-sm"
              value={exam.endTime}
              onChange={(e) => setExam({ ...exam, endTime: e.target.value })}
              required
            />
          </div>

          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-primary w-100 shadow-sm fw-semibold">
              ➕ Schedule Exam
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}
