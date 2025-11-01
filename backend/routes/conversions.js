const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Conversion = require('../models/Conversion');

// Create saved conversion
router.post('/', auth, async (req, res) => {
  try {
    const { from, to, amount, rate, result, note } = req.body;
    const saved = new Conversion({ userId: req.user.id, from, to, amount, rate, result, note });
    await saved.save();
    res.json(saved);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// Read all for user
router.get('/', auth, async (req, res) => {
  try {
    const list = await Conversion.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// Update
router.put('/:id', auth, async (req, res) => {
  try {
    const update = await Conversion.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!update) return res.status(404).json({ message: 'Not found' });
    res.json(update);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// Delete
router.delete('/:id', auth, async (req,res) => {
  try {
    const removed = await Conversion.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!removed) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// Basic conversion endpoint (client may call a live FX API instead)
router.post('/convert', auth, async (req, res) => {
  try {
    const { from, to, amount } = req.body;
    if (!from || !to || !amount) return res.status(400).json({ message: 'Missing fields' });

    // For demo: simplistic fixed rates or random — replace this by calling a real FX API.
    const demoRates = {
      'USD_INR': 83.5, 'INR_USD': 1/83.5,
      'EUR_USD': 1.09, 'USD_EUR': 1/1.09
    };
    const key = `${from}_${to}`;
    let rate = demoRates[key] || (Math.random() * (1.5 - 0.5) + 0.5);
    const result = Number((rate * Number(amount)).toFixed(4));
    res.json({ from, to, amount, rate, result });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
