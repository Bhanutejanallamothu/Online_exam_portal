import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config';

export default function ViewAllStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get(`${config.url}/teacher/students`)
      .then(res => setStudents(res.data))
      .catch(() => toast.error('Failed to fetch students'));
  }, []);

  return (
    <div className="container mt-5">
      <ToastContainer position="top-center" />
      <h3 className="mb-4 text-center text-primary fw-bold">All Students</h3>
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-primary">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Course</th>
            <th>DOB</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, idx) => (
            <tr key={idx}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>{s.department}</td>
              <td>{s.course}</td>
              <td>{s.dob}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
