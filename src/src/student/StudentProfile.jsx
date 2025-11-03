import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Avatar, IconButton, Grid, CircularProgress } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import axios from 'axios';
import config from '../config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function StudentProfile() {
  const [student, setStudent] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const studentId = sessionStorage.getItem('studentId');

  useEffect(() => {
    axios.get(`${config.url}/student/profile/${studentId}`)
      .then(res => setStudent(res.data))
      .catch(err => console.error(err));
  }, [studentId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = () => setStudent(prev => ({ ...prev, profilePic: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  if (!student) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <ToastContainer />
      <Card className="shadow-sm p-4">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4} className="text-center">
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Avatar
                src={student.profilePic || ''}
                alt="Profile"
                sx={{ width: 150, height: 150, margin: '0 auto' }}
              />
              <IconButton
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: '#1976d2',
                  color: 'white',
                  '&:hover': { backgroundColor: '#115293' }
                }}
              >
                <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                <PhotoCamera />
              </IconButton>
            </div>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Typography variant="h5" className="mb-2">{student.name}</Typography>
            <Typography variant="body1" className="mb-1"><strong>Email:</strong> {student.email}</Typography>
            <Typography variant="body1" className="mb-1"><strong>Phone:</strong> {student.phone || '-'}</Typography>
            <Typography variant="body1" className="mb-1"><strong>Course:</strong> {student.courseName || '-'}</Typography>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
