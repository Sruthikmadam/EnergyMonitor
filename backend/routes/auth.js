import express from 'express';
import { User } from '../models/User.js';
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, devices } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered' });

    const user = new User({ name, email, password, devices });
    await user.save();

    res.status(201).json({ message: 'User registered successfully', userId: user._id });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
});

export default router;
