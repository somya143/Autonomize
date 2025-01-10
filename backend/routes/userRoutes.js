const express = require('express');
const axios = require('axios');
const User = require('../models/user');
const router = express.Router();
const validate = require("./../middlewares/validationMiddleware");

// Save GitHub user data
router.post(
    '/:username',
    validate([check('username').isString().trim().notEmpty().withMessage('Username is required.')]),
    async (req, res) => {
      const { username } = req.params;
      try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(200).json(existingUser);
  
        const response = await axios.get(`https://api.github.com/users/${username}`);
        const userData = response.data;
  
        const newUser = new User({
          username: userData.login,
          name: userData.name,
          avatar_url: userData.avatar_url,
          bio: userData.bio,
          blog: userData.blog,
          location: userData.location,
          followers: userData.followers,
          following: userData.following,
          public_repos: userData.public_repos,
          public_gists: userData.public_gists,
          created_at: userData.created_at,
        });
  
        await newUser.save();
        res.status(201).json(newUser);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  );

// Fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({ deleted: false });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Soft delete a user
router.delete('/:username', async (req, res) => {
  const { username } = req.params;
  try {
    await User.updateOne({ username }, { deleted: true });
    res.status(200).json({ message: 'User soft-deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user fields
router.put('/:username', async (req, res) => {
  const { username } = req.params;
  const updates = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate({ username }, updates, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sort users by a field
router.get('/sorted/:field', async (req, res) => {
  const { field } = req.params;
  try {
    const users = await User.find({ deleted: false }).sort({ [field]: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search users by username, location, etc.
router.get('/search', async (req, res) => {
    const query = req.query;
    try {
      const searchCriteria = { deleted: false };
  
      Object.entries(query).forEach(([key, value]) => {
        searchCriteria[key] = { $regex: value, $options: 'i' };
      });
  
      const users = await User.find(searchCriteria);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

// Find mutual followers and save as friends
router.get('/:username/mutual-friends', async (req, res) => {
    const { username } = req.params;
    try {
      const user = await User.findOne({ username });
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      const followersResponse = await axios.get(`https://api.github.com/users/${username}/followers`);
      const followingResponse = await axios.get(`https://api.github.com/users/${username}/following`);
  
      const followers = followersResponse.data.map(f => f.login);
      const following = followingResponse.data.map(f => f.login);
  
      const mutualFriends = followers.filter(f => following.includes(f));
  
      user.friends = mutualFriends;
      await user.save();
  
      res.status(200).json({ mutualFriends });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;