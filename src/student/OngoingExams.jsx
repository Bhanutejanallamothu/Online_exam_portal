import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, RadioGroup, FormControlLabel, Radio, Button, Grid, CircularProgress } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from '../config';

export default function OngoingExams() {
  const studentId = sessionStorage.getItem('studentId');
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    // Fetch exams scheduled for student
    axios.get(`${config.url}/student/exams/upcoming`)
      .then(res => setExams(res.data))
      .catch(() => toast.error('Failed to fetch exams'))
      .finally(() => setLoading(false));
  }, [studentId]);

  useEffect(() => {
    if (timeLeft <= 0 && selectedExam) {
      handleSubmit();
    }
  }, [timeLeft]);

  const startExam = (exam) => {
    setSelectedExam(exam);
    setAnswers(new Array(exam.questions.length).fill(null));
    const now = new Date();
    const endTime = new Date(exam.scheduledDateTime);
    endTime.setMinutes(endTime.getMinutes() + exam.duration); // add exam duration
    setTimeLeft(Math.floor((endTime - now) / 1000));

    // countdown timer
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAnswerChange = (qIndex, value) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = parseInt(value);
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (!selectedExam) return;

    axios.post(`${config.url}/student/${studentId}/exam/${selectedExam.id}/submit`, { answers })
      .then(res => {
        toast.success(`Exam submitted! Score: ${res.data.score}%`);
        setSelectedExam(null);
        clearInterval(timerRef.current);
      })
      .catch(() => toast.error('Failed to submit exam'));
  };

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
      {!selectedExam ? (
        <>
          <Typography variant="h4" className="mb-4 text-center">Ongoing Exams</Typography>
          {exams.length === 0 && <Typography>No exams scheduled for now.</Typography>}
          <Grid container spacing={3}>
            {exams.map(exam => {
              const now = new Date();
              const examTime = new Date(exam.scheduledDateTime);
              const examEndTime = new Date(examTime);
              examEndTime.setMinutes(examEndTime.getMinutes() + exam.duration);
              const isLive = now >= examTime && now <= examEndTime;

              return (
                <Grid item xs={12} md={6} key={exam.id}>
                  <Card className="shadow-sm p-3">
                    <CardContent>
                      <Typography variant="h6">{exam.name}</Typography>
                      <Typography variant="body2">Scheduled: {new Date(exam.scheduledDateTime).toLocaleString()}</Typography>
                      <Typography variant="body2">Duration: {exam.duration} minutes</Typography>
                      {isLive ? (
                        <Button variant="contained" color="primary" className="mt-3" onClick={() => startExam(exam)}>Start Exam</Button>
                      ) : (
                        <Typography className="mt-2 text-muted">{now < examTime ? 'Exam not started yet' : 'Exam ended'}</Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </>
      ) : (
        <>
          <Typography variant="h4" className="mb-4 text-center">{selectedExam.name}</Typography>
          <Typography variant="h6" className="mb-3 text-danger">
            Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </Typography>

          {selectedExam.questions.map((q, qIndex) => (
            <Card className="mb-4 shadow-sm p-3" key={qIndex}>
              <CardContent>
                <Typography variant="h6">{qIndex + 1}. {q.questionText}</Typography>
                <RadioGroup value={answers[qIndex]} onChange={(e) => handleAnswerChange(qIndex, e.target.value)}>
                  {q.options.map((opt, oIndex) => (
                    <FormControlLabel key={oIndex} value={oIndex} control={<Radio />} label={opt} />
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}

          <Button variant="contained" color="success" onClick={handleSubmit} className="mb-5">Submit Exam</Button>
        </>
      )}
    </div>
  );
}
