import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

const dbUri = process.env.MONGO_URI || 'mongodb://localhost:27017/MERN-RealEstateX';

mongoose.connect(dbUri)
  .then(() => {
    console.log('Connected to MongoDB server');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the application if unable to connect to MongoDB
  });

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Set up routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// Error handling middleware
// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error!';
  // Send the error response to the client
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});


app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});
