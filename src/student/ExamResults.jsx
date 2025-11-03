import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Card, CardContent, Typography, Modal, Box, CircularProgress } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import axios from 'axios';
import config from '../config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ExamResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const studentId = sessionStorage.getItem('studentId');

  useEffect(() => {
    axios.get(`${config.url}/student/results/${studentId}`)
      .then(res => {
        setResults(res.data);
        setLoading(false);
      })
      .catch(err => {
        toast.error('Failed to fetch results');
        setLoading(false);
      });
  }, [studentId]);

  const handleViewPaper = (result) => {
    setSelectedPaper(result);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedPaper(null);
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
      <Typography variant="h4" className="mb-4 text-center">Exam Results</Typography>

      <TableContainer component={Paper} className="shadow-sm">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Exam Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.id}>
                <TableCell>{result.examName}</TableCell>
                <TableCell>{new Date(result.date).toLocaleDateString()}</TableCell>
                <TableCell>{result.score} / {result.total}</TableCell>
                <TableCell>{result.pass ? 'Pass' : 'Fail'}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleViewPaper(result)}>
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal to display paper details */}
      <Modal open={openModal} onClose={handleClose}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 500 },
          bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2
        }}>
          {selectedPaper && (
            <Card>
              <CardContent>
                <Typography variant="h5" className="mb-2">{selectedPaper.examName}</Typography>
                <Typography variant="body1" className="mb-1"><strong>Score:</strong> {selectedPaper.score} / {selectedPaper.total}</Typography>
                <Typography variant="body1" className="mb-1"><strong>Percentage:</strong> {((selectedPaper.score / selectedPaper.total) * 100).toFixed(2)}%</Typography>
                <Typography variant="body1" className="mb-1"><strong>Status:</strong> {selectedPaper.pass ? 'Pass' : 'Fail'}</Typography>
                <Typography variant="body1" className="mt-3"><strong>Mistakes:</strong></Typography>
                {selectedPaper.mistakes && selectedPaper.mistakes.length > 0 ? (
                  selectedPaper.mistakes.map((m, idx) => (
                    <Typography key={idx} variant="body2">Q{m.questionNumber}: Your Answer: {m.selected} | Correct Answer: {m.correct}</Typography>
                  ))
                ) : (
                  <Typography variant="body2">No mistakes!</Typography>
                )}
              </CardContent>
            </Card>
          )}
        </Box>
      </Modal>
    </div>
  );
}
