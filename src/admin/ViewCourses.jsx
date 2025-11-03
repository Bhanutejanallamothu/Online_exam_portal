import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import config from '../config';
import { useNavigate } from 'react-router-dom';

export default function ViewCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    axios.get(`${config.url}/admin/courses`)
      .then(res => setCourses(res.data))
      .catch(err => toast.error('Failed to fetch courses'));
  };

  const handleDelete = (id) => {
    axios.delete(`${config.url}/admin/courses/${id}`)
      .then(() => {
        toast.success('Course deleted!');
        fetchCourses();
      })
      .catch(() => toast.error('Failed to delete course'));
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h3 className="mb-4">Courses List</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map(course => (
              <TableRow key={course.id}>
                <TableCell>{course.id}</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.duration}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={()=>navigate(`/admin/update-course/${course.id}`)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={()=>handleDelete(course.id)}>
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
