import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import config from '../config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ViewUpcomingExams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const studentId = sessionStorage.getItem('studentId');

  useEffect(() => {
    axios.get(`${config.url}/student/exams/upcoming`)
      .then(res => {
        setExams(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Failed to fetch upcoming exams');
        setLoading(false);
      });
  }, [studentId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <ToastContainer />
      <Typography variant="h4" className="mb-4 text-center">Upcoming Exams</Typography>

      <TableContainer component={Paper} className="shadow-sm">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Exam Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Duration (minutes)</TableCell>
              <TableCell>Teacher</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">No upcoming exams</TableCell>
              </TableRow>
            ) : (
              exams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell>{exam.name}</TableCell>
                  <TableCell>{new Date(exam.date).toLocaleString()}</TableCell>
                  <TableCell>{exam.duration}</TableCell>
                  <TableCell>{exam.teacherName}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
