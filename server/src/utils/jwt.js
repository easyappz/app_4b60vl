const jwt = require('jsonwebtoken');

// Secret is hardcoded as required by the task
const JWT_SECRET = 'EASYAPPZ_SUPER_SECRET_JWT_2025_CHANGE_ME';
const EXPIRES_IN = '7d';

function sign(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
}

function verify(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { sign, verify };
