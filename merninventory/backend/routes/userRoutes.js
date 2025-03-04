const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'ggjySDDG';

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    return res.json({
      success: true,
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

  router.post('/signup', async (req, res) => {
    const { email, username, password } = req.body;
    try {
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ success: false, message: 'User already exists' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, username, password: hashedPassword });
      await newUser.save();
  
      const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
  
      return res.json({
        success: true,
        token,
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email
        }
      });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

  module.exports = router;
