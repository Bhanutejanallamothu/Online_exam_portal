import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import config from '../config';

export default function TeacherDashboard() {
  const [stats, setStats] = useState(null);
  const teacherId = sessionStorage.getItem('teacherId');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [studentsRes, upcomingExamsRes, scheduledExamsRes, profileRes] = await Promise.all([
          axios.get(`${config.url}/teacher/students/count`),
          axios.get(`${config.url}/teacher/exams/upcoming/count`),
          axios.get(`${config.url}/teacher/exams/scheduled/count`),
          axios.get(`${config.url}/teacher/profile/${teacherId}`)
        ]);

        setStats([
          { title: 'Total Students', count: studentsRes.data.count },
          { title: 'Upcoming Exams', count: upcomingExamsRes.data.count },
          { title: 'Exams Scheduled', count: scheduledExamsRes.data.count },
          { 
            title: 'Profile Completeness', 
            count: `${profileRes.data.completeness}%` // assume backend returns a completeness number
          },
        ]);
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      }
    };

    fetchStats();
  }, [teacherId]);

  if (!stats) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Typography variant="h4" className="mb-4">Welcome, {sessionStorage.getItem('teacherName')}!</Typography>
      <Grid container spacing={3}>
        {stats.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card className="shadow-sm">
              <CardContent>
                <Typography variant="h6" color="textSecondary">{item.title}</Typography>
                <Typography variant="h5" className="fw-bold">{item.count}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
