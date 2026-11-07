// : POST /api/v1/sessions  (log in)
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findByEmail, toPublic } = require('../users');

const router = express.Router();
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/', (req, res) => {
  // Step 1: check the body. Never trust input.
  const body = req.body || {};
  const { email, password } = body;

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !EMAIL_PATTERN.test(email.trim()) ||
    password.length === 0
  ) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  // Step 2: find the user (email in lowercase).
  const user = findByEmail(email.trim().toLowerCase());

  // Step 3: compare the typed password with the stored hash.
  const passwordOk = user ? bcrypt.compareSync(password, user.passwordHash) : false;

  // Step 4: same message for unknown email and wrong password.
  if (!user || !passwordOk) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  // Step 5: create a token that expires in 1 hour, then answer 200.
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return res.status(200).json({ token, user: toPublic(user) });
});

module.exports = router;