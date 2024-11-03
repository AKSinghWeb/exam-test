import express from 'express';
import {
  fetchCandidates,
  addCandidate,
  assignQuestionSet,
  assignQuestions,
  getStatusByEmail, // New function for getting candidate status
  getSetByEmail, // Function for getting set ID and questions
  setCandidateAnswer,
  deleteCandidate,
} from '../controllers/candidateController.js';

const router = express.Router();

// Fetch all candidates
router.get('/', fetchCandidates);

// Add a new candidate
router.post('/', addCandidate);

// Assign a question set to a candidate
router.post('/assign-set', assignQuestionSet);

// Assign individual questions to a candidate
router.post('/assign-questions', assignQuestions);

// Get question set by candidate email
router.get('/setid', getSetByEmail);

// Get status by candidate email
router.get('/status', getStatusByEmail);

// Set candidate's answer to a question
router.post('/submit-answer', setCandidateAnswer);

// Delete a candidate
router.delete('/:email', deleteCandidate);


export default router;
