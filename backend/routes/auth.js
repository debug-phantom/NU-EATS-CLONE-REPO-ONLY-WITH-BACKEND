const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs-extra');
const path = require('path');
const router = express.Router();

const usersPath = path.join(__dirname, '../data/users.json');

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const users = await fs.readJson(usersPath);
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

// REGISTER (optional – or only admin can create users)
router.post('/register', async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;
  const users = await fs.readJson(usersPath);
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ msg: 'User already exists' });
  }
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password: await bcrypt.hash(password, 10),
    role
  };
  users.push(newUser);
  await fs.writeJson(usersPath, users);
  res.status(201).json({ msg: 'User created' });
});

module.exports = router;