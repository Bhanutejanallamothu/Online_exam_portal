import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import config from '../config';

export default function UpdateCourse() {
  const { id } = useParams(); // course id from URL
  const [course, setCourse] = useState({ name: '', duration: '' });

  useEffect(() => {
    axios.get(`${config.url}/admin/courses/${id}`)
      .then(res => setCourse(res.data))
      .catch(err => toast.error('Failed to fetch course'));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${config.url}/admin/courses/${id}`, course)
      .then(() => toast.success('Course updated successfully!'))
      .catch(() => toast.error('Failed to update course'));
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <ToastContainer />
      <h3 className="mb-4">Update Course</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Course Name</label>
          <input type="text" className="form-control" value={course.name} onChange={(e)=>setCourse({...course, name: e.target.value})} required/>
        </div>
        <div className="mb-3">
          <label>Duration</label>
          <input type="text" className="form-control" value={course.duration} onChange={(e)=>setCourse({...course, duration: e.target.value})} required/>
        </div>
        <button type="submit" className="btn btn-primary w-100">Update Course</button>
      </form>
    </div>
  );
}
