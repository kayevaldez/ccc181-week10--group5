// : demo users. No database is needed for this activity.
const bcrypt = require('bcryptjs');

// The demo account is required by the instructor (Section 11).
// The password is stored as a hash, never as plain text.
const users = [
  {
    id: 1,
    name: 'Demo Student',
    email: 'student@campusconnect.test',
    passwordHash: bcrypt.hashSync('Campus26', 10),
  },
];

function findByEmail(email) {
  return users.find((user) => user.email === email);
}

function findById(id) {
  return users.find((user) => user.id === id);
}

// Only these fields may leave the server. Never send passwordHash.
function toPublic(user) {
  return { id: user.id, name: user.name, email: user.email };
}

module.exports = { findByEmail, findById, toPublic };