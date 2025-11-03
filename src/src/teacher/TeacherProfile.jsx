import React, { useState, useEffect } from 'react';
import { Card, Grid, Typography, Avatar, IconButton, CircularProgress } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import axios from 'axios';
import config from '../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TeacherProfile() {
  const [teacher, setTeacher] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const teacherId = sessionStorage.getItem('teacherId');

  useEffect(() => {
    if (!teacherId) {
      toast.error('Teacher not logged in!');
      return;
    }

    axios.get(`${config.url}/teacher/profile/${teacherId}`)
      .then(res => setTeacher(res.data))
      .catch(err => toast.error('Failed to load profile'));
  }, [teacherId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('id', teacherId);
    formData.append('profilePic', file);

    axios.put(`${config.url}/teacher/profile-image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(res => {
        setTeacher(res.data);
        toast.success('Profile picture updated!');
      })
      .catch(() => toast.error('Failed to update profile picture'));
  };

  if (!teacher) {
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
                src={profileImage || teacher.profilePic ? `${config.url}/${teacher.profilePic}` : ''}
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
            <Typography variant="h5" className="mb-2">{teacher.name}</Typography>
            <Typography variant="body1" className="mb-1"><strong>Email:</strong> {teacher.email}</Typography>
            <Typography variant="body1" className="mb-1"><strong>Phone:</strong> {teacher.phone || '-'}</Typography>
            <Typography variant="body1" className="mb-1"><strong>Department:</strong> {teacher.department || '-'}</Typography>
            <Typography variant="body1" className="mb-1"><strong>Qualification:</strong> {teacher.qualification || '-'}</Typography>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
