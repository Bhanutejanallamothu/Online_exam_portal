import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table } from 'react-bootstrap';
import config from '../config';

export default function StudentExamResult() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get(`${config.url}/examresults`)
      .then(res => setResults(res.data))
      .catch(() => toast.error('Failed to fetch results'));
  }, []);

  return (
    <div className="container mt-5">
      <ToastContainer position="top-center" />
      <h3 className="mb-4 text-center text-primary fw-bold">Student Exam Results</h3>
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-primary">
          <tr>
            <th>Student Name</th>
            <th>Exam Name</th>
            <th>Score</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, idx) => (
            <tr key={idx}>
              <td>{r.studentName}</td>
              <td>{r.examName}</td>
              <td>{r.score}</td>
              <td className={r.status === 'Passed' ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                {r.status}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
