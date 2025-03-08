const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { requireAuth } = require('./middleware/auth');

// Middleware to check if user is admin
const requireAdmin = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Get all users (admin only)
router.get('/users', requireAuth, requireAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Block/unblock user (admin only)
router.post('/users/:id/block', requireAuth, requireAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.role === 'admin') {
      return res.status(403).json({ error: 'Cannot block admin users' });
    }

    user.blocked = req.body.blocked;
    await user.save();

    res.json({
      success: true,
      message: `User ${req.body.blocked ? 'blocked' : 'unblocked'} successfully`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user role (admin only)
router.post('/users/:id/role', requireAuth, requireAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.role = req.body.role;
    await user.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;