const bcrypt = require('bcryptjs');
const User = require('@src/models/User');
const jwtUtil = require('@src/utils/jwt');

function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function normalizeEmail(email) {
  return (email || '').trim().toLowerCase();
}

exports.register = async (req, res) => {
  const { email, name, password } = req.body || {};

  if (!email || !name || !password) {
    throw httpError(400, 'email, name and password are required');
  }
  if (typeof email !== 'string' || typeof name !== 'string' || typeof password !== 'string') {
    throw httpError(400, 'Invalid data types for email/name/password');
  }
  if (password.length < 6) {
    throw httpError(400, 'Password must be at least 6 characters');
  }

  const emailNorm = normalizeEmail(email);

  const exists = await User.findOne({ email: emailNorm });
  if (exists) {
    throw httpError(409, 'User with this email already exists');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email: emailNorm, name: name.trim(), passwordHash });

  const token = jwtUtil.sign({ userId: user._id.toString() });

  return res.status(201).json({
    token,
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl || null,
      createdAt: user.createdAt
    }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    throw httpError(400, 'email and password are required');
  }
  if (typeof email !== 'string' || typeof password !== 'string') {
    throw httpError(400, 'Invalid data types for email/password');
  }

  const emailNorm = normalizeEmail(email);
  const user = await User.findOne({ email: emailNorm });
  if (!user) {
    throw httpError(401, 'Invalid email or password');
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    throw httpError(401, 'Invalid email or password');
  }

  const token = jwtUtil.sign({ userId: user._id.toString() });

  return res.json({
    token,
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl || null,
      createdAt: user.createdAt
    }
  });
};

exports.me = async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    throw httpError(401, 'Unauthorized');
  }
  const user = await User.findById(userId);
  if (!user) {
    throw httpError(404, 'User not found');
  }
  return res.json({
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    avatarUrl: user.avatarUrl || null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  });
};
