// : reads "Authorization: Bearer <token>" and checks the token.
const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Not logged in.' });
  }

  try {
    // Uses the SAME JWT_SECRET that created the token. Fails if wrong or expired.
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    return next();
  } catch {
    return res.status(401).json({ error: 'Not logged in.' });
  }
}

module.exports = { requireAuth };