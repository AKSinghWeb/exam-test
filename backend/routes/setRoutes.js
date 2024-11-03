import express from 'express';
import { createSet, getAllSets, getSetById, deleteSet } from '../controllers/setController.js';

const router = express.Router();

// Route to create a new set
router.post('/', createSet);

// Route to get all sets
router.get('/', getAllSets);

// Route to get a specific set by ID
router.get('/:id', getSetById);

// Route to delete a specific set by ID
router.delete('/:id', deleteSet);

export default router;
