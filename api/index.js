import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbUri = process.env.MONGO_URI || 'mongodb://localhost:27017/MERN-RealEstateX';

mongoose.connect(dbUri);

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB server');
});

const app = express();

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

