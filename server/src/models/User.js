const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    passwordHash: { type: String, required: true },
    avatarUrl: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
