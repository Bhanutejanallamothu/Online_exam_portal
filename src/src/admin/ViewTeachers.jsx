import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import config from '../config';
import { useNavigate } from 'react-router-dom';

export default function ViewTeachers() {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = () => {
    axios.get(`${config.url}/admin/teachers`)
      .then(res => setTeachers(res.data))
      .catch(() => toast.error('Failed to fetch teachers'));
  };

  const handleDelete = (id) => {
    axios.delete(`${config.url}/admin/teachers/${id}`)
      .then(() => {
        toast.success('Teacher deleted!');
        fetchTeachers();
      })
      .catch(() => toast.error('Failed to delete teacher'));
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h3 className="mb-4">Teachers List</h3>
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
            {teachers.map(teacher => (
              <TableRow key={teacher.id}>
                <TableCell>{teacher.id}</TableCell>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={()=>navigate(`/admin/update-teacher/${teacher.id}`)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={()=>handleDelete(teacher.id)}>
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
