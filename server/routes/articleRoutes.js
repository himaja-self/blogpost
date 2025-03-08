const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const { requireAuth } = require('./middleware/auth');

// Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find()
      .populate('author', 'email')
      .sort({ createdAt: -1 });
    res.json({ articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// Create article (only for authors)
router.post('/', requireAuth, async (req, res) => {
  try {
    if (req.user.role !== 'author') {
      return res.status(403).json({ error: 'Only authors can create articles' });
    }

    const article = new Article({
      title: req.body.title,
      content: req.body.content,
      author: req.user._id
    });

    await article.save();
    await article.populate('author', 'email');

    res.status(201).json({ article });
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

module.exports = router;