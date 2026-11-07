// MEMBER 2: GET /api/v1/users/me  (needs a token)
const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { findById, toPublic } = require('../users');

const router = express.Router();

router.get('/me', requireAuth, (req, res) => {
  const user = findById(req.userId);
  if (!user) {
    return res.status(401).json({ error: 'Not logged in.' });
  }
  return res.status(200).json(toPublic(user));
});

module.exports = router;