import express from 'express';
import {checkIfCandidateHasSubmittedTest } from '../controllers/checkController.js';

const router = express.Router();


router.get('/:id', checkIfCandidateHasSubmittedTest);

export default router;
