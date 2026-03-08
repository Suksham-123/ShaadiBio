import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Import the blueprint we just made!

const router = express.Router();

// Utility function to generate a secure JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // The user will stay logged in for 30 days
  });
};

// ==========================================
// @route   POST /api/auth/register
// @desc    Register a new user
// ==========================================
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // 1. Check if the user already exists in the database
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'This email is already registered' });
    }

    // 2. Create the new user (Mongoose will automatically hash the password because of our pre-save hook!)
    const user = await User.create({
      fullName,
      email,
      password,
    });

    // 3. Send back the success response along with their new JWT token
    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data received' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// ==========================================
// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// ==========================================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find the user by their email
    const user = await User.findOne({ email });

    // 2. Check if the user exists AND if the typed password matches the hashed password
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      // Security best practice: Don't tell them exactly WHICH part was wrong (email or password)
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

export default router;