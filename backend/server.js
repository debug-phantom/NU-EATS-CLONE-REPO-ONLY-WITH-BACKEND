const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs-extra');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure data folder and files exist
const dataDir = path.join(__dirname, 'data');
['users.json', 'menu.json', 'orders.json'].forEach(file => {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) fs.writeJsonSync(filePath, []);
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/menu', require('./routes/menu'));
app.use('/api/users', require('./routes/users'));
app.use('/api/orders', require('./routes/orders'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));