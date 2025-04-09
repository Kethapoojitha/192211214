const express = require('express');
const router = express.Router();
const {
  getTopUsers,
  getPopularPosts,
  getLatestPosts
} = require('../controllers/apiController');

router.get('/users', getTopUsers);
router.get('/posts', (req, res) => {
  const { type } = req.query;
  if (type === 'popular') return getPopularPosts(req, res);
  if (type === 'latest') return getLatestPosts(req, res);
  return res.status(400).json({ error: 'Invalid type param' });
});

module.exports = router;
