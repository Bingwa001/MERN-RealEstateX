import express from 'express';
import User from '../models/user.model.js'; // Import the User model
import bcryptjs from 'bcryptjs'; // Import bcryptjs for password hashing
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

export default userRouter;
