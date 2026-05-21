const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const router = express.Router();

const ordersPath = path.join(__dirname, '../data/orders.json');

// GET orders – user gets own orders, admin gets all
router.get('/', auth, async (req, res) => {
  const orders = await fs.readJson(ordersPath);
  if (req.user.role === 'admin') return res.json(orders);
  res.json(orders.filter(o => o.userId === req.user.id));
});

// POST new order (authenticated users)
router.post('/', auth, async (req, res) => {
  const { items, totalPrice } = req.body;   // items: array of {id, name, price, quantity}
  const orders = await fs.readJson(ordersPath);
  const newOrder = {
    id: orders.length + 1,
    userId: req.user.id,
    items,
    totalPrice,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  orders.push(newOrder);
  await fs.writeJson(ordersPath, orders);
  res.status(201).json(newOrder);
});

module.exports = router;