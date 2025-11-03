import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config';

export default function UpcomingExams() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axios.get(`${config.url}/teacher/exams/upcoming`)
      .then(res => setExams(res.data))
      .catch(() => toast.error('Failed to fetch upcoming exams'));
  }, []);

  return (
    <div className="container mt-5">
      <ToastContainer position="top-center" />
      <h3 className="mb-4 text-center text-success fw-bold">Upcoming Exams</h3>
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-success">
          <tr>
            <th>Exam Name</th>
            <th>Course</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {exams.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-muted">No upcoming exams</td>
            </tr>
          ) : (
            exams.map((exam, idx) => (
              <tr key={idx}>
                <td>{exam.examName}</td>
                <td>{exam.courseName}</td>
                <td>{exam.date}</td>
                <td>{exam.startTime}</td>
                <td>{exam.endTime}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
