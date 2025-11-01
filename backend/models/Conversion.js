const mongoose = require('mongoose');

const ConversionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  rate: { type: Number, required: true },
  amount: { type: Number, required: true },
  result: { type: Number, required: true },
  note: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Conversion', ConversionSchema);
