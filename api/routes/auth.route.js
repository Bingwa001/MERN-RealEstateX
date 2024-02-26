// auth.route.js
import express from 'express';
import User from '../models/user.model.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    // Your user creation logic
    const newUser = await User.create(req.body);

    // Sending back both success message and user data
    res.status(201).json({
      message: 'User created successfully!!',
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
