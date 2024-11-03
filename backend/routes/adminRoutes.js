import express from 'express';
import { registerAdmin, loginAdmin, getAdminProfile } from '../controllers/adminController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin routes
router.post('/register', registerAdmin); // Admin registration
router.post('/login', loginAdmin); // Admin login
router.get('/profile', protectAdmin, getAdminProfile); // Get admin profile (protected)

export default router;
