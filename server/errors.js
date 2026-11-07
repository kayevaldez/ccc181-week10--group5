// : unknown routes (404) and crashes (500).

function notFound(req, res) {
  res.status(404).json({ error: 'Not found.' });
}

// Express knows this is an error handler because it has 4 parameters.
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // Badly formed JSON in the request body is a client mistake: 400.
  if (err && err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  // Log only the message. Never log tokens or send stack traces to the user.
  console.error('Server error:', err && err.message);
  return res.status(500).json({ error: 'Something went wrong.' });
}

module.exports = { notFound, errorHandler };