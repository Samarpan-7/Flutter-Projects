const express = require('express');
const axios = require('axios');
const router = express.Router();
const jwt = require('jsonwebtoken');

// 🔒 Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// 💱 Currency Conversion Route
router.post('/convert', verifyToken, async (req, res) => {
  try {
    const { from, to, amount } = req.body;
    const url = `${process.env.EXCHANGE_RATE_API_URL}/${process.env.EXCHANGE_RATE_API_KEY}/pair/${from}/${to}/${amount}`;

    const response = await axios.get(url);

    res.json({
      success: true,
      user: req.user.id,
      conversion: response.data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Conversion failed',
      error: err.message
    });
  }
});

module.exports = router;
