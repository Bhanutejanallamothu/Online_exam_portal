import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import config from '../config';
import { useNavigate } from 'react-router-dom';

export default function ViewExams() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = () => {
    axios.get(`${config.url}/admin/exams`)
      .then(res => setExams(res.data))
      .catch(() => toast.error('Failed to fetch exams'));
  };

  const handleDelete = (id) => {
    axios.delete(`${config.url}/admin/exams/${id}`)
      .then(() => {
        toast.success('Exam deleted!');
        fetchExams();
      })
      .catch(() => toast.error('Failed to delete exam'));
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h3 className="mb-4">Exams List</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.map(exam => (
              <TableRow key={exam.id}>
                <TableCell>{exam.id}</TableCell>
                <TableCell>{exam.title}</TableCell>
                <TableCell>{exam.date}</TableCell>
                <TableCell>{exam.courseName}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={()=>navigate(`/admin/update-exam/${exam.id}`)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={()=>handleDelete(exam.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
