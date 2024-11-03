import express from 'express';
import {
  createQuestion,
  getAllQuestions,
  getQuestionsBySet,
  updateQuestion,
  deleteQuestion,
} from '../controllers/questionController.js';

const router = express.Router();

// Route to create a new question associated with a set
router.post('/', createQuestion);

// Route to fetch all questions (can be filtered by setId via query parameters)
router.get('/', getAllQuestions);

// Route to fetch questions by setId (using route parameter)
router.get('/set/:setId', getQuestionsBySet);

// Route to update a specific question by id
router.put('/:id', updateQuestion);

// Route to delete a question by id
router.delete('/:id', deleteQuestion);

export default router;
