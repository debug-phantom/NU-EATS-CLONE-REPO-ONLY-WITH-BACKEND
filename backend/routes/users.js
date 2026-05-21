const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();
const usersPath = path.join(__dirname, '../data/users.json');

/**
 * GET /api/users
 * Get all users (admin only)
 * Removes password field from response
 */
router.get('/', auth, roleCheck('admin'), async (req, res) => {
  try {
    const users = await fs.readJson(usersPath);
    // Remove passwords before sending
    const sanitized = users.map(({ password, ...rest }) => rest);
    res.json(sanitized);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

/**
 * DELETE /api/users/:id
 * Delete a user by ID (admin only)
 */
router.delete('/:id', auth, roleCheck('admin'), async (req, res) => {
  try {
    let users = await fs.readJson(usersPath);
    const userId = parseInt(req.params.id);
    const userExists = users.some(u => u.id === userId);
    if (!userExists) {
      return res.status(404).json({ msg: 'User not found' });
    }
    users = users.filter(u => u.id !== userId);
    await fs.writeJson(usersPath, users);
    res.json({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;