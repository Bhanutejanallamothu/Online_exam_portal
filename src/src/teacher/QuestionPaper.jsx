import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, TextField, Button, RadioGroup, FormControlLabel, Radio, Typography, Grid } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import config from '../config';

export default function QuestionPaper() {
  const navigate = useNavigate();
  const location = useLocation();
  const examId = location.state?.examId; // Passed from ExamSchedule

  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctIndex: 0 }
  ]);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectChange = (qIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctIndex = parseInt(value);
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctIndex: 0 }]);
  };

  const handleSubmit = () => {
    if (!examId) {
      toast.error('Exam ID is missing!');
      return;
    }

    axios.post(`${config.url}/teacher/exam/${examId}/questions`, { questions })
      .then(() => {
        toast.success('Question Paper Generated!');
        navigate('/teacherdashboard'); // Redirect to dashboard
      })
      .catch(() => toast.error('Failed to generate question paper'));
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <Typography variant="h4" className="mb-4 text-center">Generate Question Paper</Typography>
      
      {questions.map((q, qIndex) => (
        <Card className="mb-4 shadow-sm p-3" key={qIndex}>
          <CardContent>
            <TextField
              fullWidth
              label={`Question ${qIndex + 1}`}
              value={q.questionText}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              className="mb-3"
            />
            <Grid container spacing={2}>
              {q.options.map((opt, oIndex) => (
                <Grid item xs={12} sm={6} key={oIndex}>
                  <TextField
                    fullWidth
                    label={`Option ${oIndex + 1}`}
                    value={opt}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        checked={q.correctIndex === oIndex}
                        onChange={(e) => handleCorrectChange(qIndex, oIndex, e.target.value)}
                        value={oIndex}
                      />
                    }
                    label="Correct Answer"
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ))}

      <div className="d-flex justify-content-between">
        <Button variant="outlined" color="primary" onClick={addQuestion}>Add Another Question</Button>
        <Button variant="contained" color="success" onClick={handleSubmit}>Generate Question Paper</Button>
      </div>
    </div>
  );
}
