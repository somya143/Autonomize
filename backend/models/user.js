const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  name: String,
  avatar_url: String,
  bio: String,
  blog: String,
  location: String,
  followers: Number,
  following: Number,
  public_repos: Number,
  public_gists: Number,
  created_at: Date,
  deleted: { type: Boolean, default: false },
  friends: [String],
});

module.exports = mongoose.model('User', UserSchema);