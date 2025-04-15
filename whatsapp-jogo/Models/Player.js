const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: String,
  email: String,
  whatsapp: String,
  token: String,
  hasReceivedMessage: { type: Boolean, default: false },
  pdfPath: String
});

module.exports = mongoose.model('Player', PlayerSchema);
