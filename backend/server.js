import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import candidateRoutes from './routes/candidateRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import resultsRoutes from './routes/resultsRoutes.js';
import adminRoutes from './routes/adminRoutes.js'; // Import admin routes
import setRoutes from './routes/setRoutes.js'; // Import set routes
import userRoutes from './routes/userRoutes.js';
import checkRoutes from './routes/checkRoutes.js';
import axios from 'axios'; // Import axios for self-pinging
import cron from 'node-cron'; // Import cron for periodic tasks

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/candidate', candidateRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/results', resultsRoutes);
app.use('/api/check', checkRoutes);
app.use('/api/admin', adminRoutes); // Use admin routes
app.use('/api/sets', setRoutes); // Use set routes
app.use('/api/candidates', userRoutes);

// Simple route to respond for keep-alive
app.get('/api/keep-alive', (req, res) => {
  console.log('Keep-alive request received');
  res.status(200).send('Server is alive');
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Self-ping cron job to keep the server alive
cron.schedule('* * * * *', async () => {
  try {
    const response = await axios.get(`${process.env.BASE_API_URL}/api/keep-alive`);
    console.log('Keep-alive request sent: ', response.data);
  } catch (error) {
    console.error('Error in keep-alive request:', error.message);
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect to DB after starting server
connectDB();
