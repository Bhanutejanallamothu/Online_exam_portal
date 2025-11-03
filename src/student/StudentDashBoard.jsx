import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import config from '../config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function StudentDashBoard() {
  const [counts, setCounts] = useState({ ongoing: 0, upcoming: 0, completed: 0 });
  const [loading, setLoading] = useState(true);
  const studentId = sessionStorage.getItem('studentId');

  useEffect(() => {
    axios.get(`${config.url}/student/dashboard-counts/${studentId}`)
      .then(res => {
        setCounts(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Failed to fetch dashboard counts');
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
      <Typography variant="h4" className="mb-4 text-center">Student Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card className="shadow-sm p-3">
            <CardContent>
              <Typography variant="h5" className="mb-2">Ongoing Exams</Typography>
              <Typography variant="h3" color="primary">{counts.ongoing}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="shadow-sm p-3">
            <CardContent>
              <Typography variant="h5" className="mb-2">Upcoming Exams</Typography>
              <Typography variant="h3" color="secondary">{counts.upcoming}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="shadow-sm p-3">
            <CardContent>
              <Typography variant="h5" className="mb-2">Completed Exams</Typography>
              <Typography variant="h3" color="success.main">{counts.completed}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
