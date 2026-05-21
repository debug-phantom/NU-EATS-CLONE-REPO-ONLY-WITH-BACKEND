const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const router = express.Router();

const menuPath = path.join(__dirname, '../data/menu.json');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// GET all menu items (public) – optional category filter
router.get('/', async (req, res) => {
  const menu = await fs.readJson(menuPath);
  const { category } = req.query;
  if (category && category !== 'All') {
    return res.json(menu.filter(item => item.category === category));
  }
  res.json(menu);
});

// POST – create new menu item (admin only)
router.post('/', auth, roleCheck('admin'), upload.single('image'), async (req, res) => {
  const menu = await fs.readJson(menuPath);
  const newItem = {
    id: menu.length + 1,
    name: req.body.name,
    description: req.body.description,
    price: parseFloat(req.body.price),
    category: req.body.category,
    image: req.file ? req.file.filename : null
  };
  menu.push(newItem);
  await fs.writeJson(menuPath, menu);
  res.status(201).json(newItem);
});

// PUT – update menu item (admin)
router.put('/:id', auth, roleCheck('admin'), upload.single('image'), async (req, res) => {
  const menu = await fs.readJson(menuPath);
  const index = menu.findIndex(item => item.id == req.params.id);
  if (index === -1) return res.status(404).json({ msg: 'Item not found' });

  const updated = { ...menu[index], ...req.body };
  if (req.file) updated.image = req.file.filename;
  menu[index] = updated;
  await fs.writeJson(menuPath, menu);
  res.json(updated);
});

// DELETE menu item (admin)
router.delete('/:id', auth, roleCheck('admin'), async (req, res) => {
  const menu = await fs.readJson(menuPath);
  const filtered = menu.filter(item => item.id != req.params.id);
  await fs.writeJson(menuPath, filtered);
  res.json({ msg: 'Item deleted' });
});

module.exports = router;