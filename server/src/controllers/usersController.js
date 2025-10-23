const User = require('@src/models/User');

function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

exports.getMe = async (req, res) => {
  const userId = req.userId;
  if (!userId) throw httpError(401, 'Unauthorized');
  const user = await User.findById(userId);
  if (!user) throw httpError(404, 'User not found');
  return res.json({
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    avatarUrl: user.avatarUrl || null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  });
};

exports.updateMe = async (req, res) => {
  const userId = req.userId;
  if (!userId) throw httpError(401, 'Unauthorized');

  const { name, avatarUrl } = req.body || {};
  const update = {};
  if (typeof name !== 'undefined') {
    if (typeof name !== 'string' || !name.trim()) {
      throw httpError(400, 'name must be a non-empty string');
    }
    update.name = name.trim();
  }
  if (typeof avatarUrl !== 'undefined') {
    if (avatarUrl !== null && typeof avatarUrl !== 'string') {
      throw httpError(400, 'avatarUrl must be a string or null');
    }
    update.avatarUrl = avatarUrl || '';
  }

  const user = await User.findByIdAndUpdate(userId, update, { new: true });
  if (!user) throw httpError(404, 'User not found');

  return res.json({
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    avatarUrl: user.avatarUrl || null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  });
};
