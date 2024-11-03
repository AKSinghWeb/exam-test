import express from 'express';
import { getCandidateResults, getSingleCandidateResult , checkIfCandidateHasSubmittedTest } from '../controllers/resultsController.js';

const router = express.Router();

// Route to fetch all candidate results
router.get('/', getCandidateResults);

// Route to fetch a single candidate result by ID
router.get('/:id', getSingleCandidateResult);

// router.get('/check/:id', checkIfCandidateHasSubmittedTest);

export default router;
