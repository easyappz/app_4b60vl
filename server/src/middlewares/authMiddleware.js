const jwtUtil = require('@src/utils/jwt');

module.exports = function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization ? req.headers.authorization : '';
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header is missing' });
    }
    const isBearer = authHeader.toLowerCase().startsWith('bearer ');
    if (!isBearer) {
      return res.status(401).json({ message: 'Authorization header must be Bearer <token>' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }
    const decoded = jwtUtil.verify(token);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    const payload = { message: error.message };
    if (process.env.NODE_ENV === 'development' && error.stack) payload.stack = error.stack;
    return res.status(401).json(payload);
  }
};
