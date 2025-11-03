import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import config from '../config';

export default function ViewStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get(`${config.url}/admin/students`)
      .then(res => setStudents(res.data))
      .catch(() => toast.error('Failed to fetch students'));
  };

  const handleDelete = (id) => {
    axios.delete(`${config.url}/admin/students/${id}`)
      .then(() => {
        toast.success('Student deleted!');
        fetchStudents();
      })
      .catch(() => toast.error('Failed to delete student'));
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h3 className="mb-4">Students List</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map(student => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={()=>handleDelete(student.id)}>
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
