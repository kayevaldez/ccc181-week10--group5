// MEMBER 1: the Express app. Member 2 adds the lines marked "MEMBER 2".
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sessionsRouter = require('./routes/sessions');
// MEMBER 2 adds the require lines for usersRouter, notFound and errorHandler here.

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is missing. Create server/.env from server/.env.example.');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

// cors and express.json() come BEFORE the routes.
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/v1/sessions', sessionsRouter);

// MEMBER 2 adds the usersRouter, notFound and errorHandler lines here (after all routes).

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});