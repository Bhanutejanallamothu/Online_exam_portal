import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import config from '../config';

export default function ViewExamResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = () => {
    axios.get(`${config.url}/admin/results`)
      .then(res => setResults(res.data))
      .catch(() => toast.error('Failed to fetch results'));
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h3 className="mb-4">Exam Results</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Result ID</TableCell>
              <TableCell>Student</TableCell>
              <TableCell>Exam</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map(result => (
              <TableRow key={result.id}>
                <TableCell>{result.id}</TableCell>
                <TableCell>{result.studentName}</TableCell>
                <TableCell>{result.examTitle}</TableCell>
                <TableCell>{result.score}</TableCell>
                <TableCell>{result.passed ? 'Pass' : 'Fail'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
